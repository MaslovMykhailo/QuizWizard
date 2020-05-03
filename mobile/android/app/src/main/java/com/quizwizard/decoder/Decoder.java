package com.quizwizard.decoder;

import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgproc.Imgproc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Decoder {
  private Mat sheet = new Mat();
  private static final double SHEET_RECT_RATIO = 0.7;
  private static final double CIRCLE_RECT_RATIO = 1;

  private Mat answersSection = new Mat();
  private MatOfPoint answersSectionContour = new MatOfPoint();
  private static final double ANSWERS_RECT_RATIO = 1;
  private static final double ANSWERS_RECT_TO_CIRCLE_RATIO = 21;

  private Mat responderSection = new Mat();
  private MatOfPoint responderSectionContour = new MatOfPoint();
  private static final int RESPONDER_ID_LENGTH = 3;
  private static final double RESPONDER_RECT_RATIO = 1.36;

  private static final int ANSWERS_COUNT = 30;
  private static final int ANSWERS_OPTIONS_COUNT = 5;
  private DecodedSheet decodedSheet;

  private Comparator<MatOfPoint> sortByX = new SortUtils.SortContoursByX();
  private Comparator<MatOfPoint> sortByY = new SortUtils.SortContoursByY();

  private void extractSheet() {
    MatOfPoint sheetContour = OpenCvUtils.detectRect(
            sheet,
            new Size(5, 5),
            SHEET_RECT_RATIO
    );

    if (sheetContour != null) {
      OpenCvUtils.fourPointTransform(sheet, sheetContour).copyTo(sheet);
    }
  }

  private void extractAnswersSection() throws DecodeException {
    MatOfPoint answersContour = OpenCvUtils.detectRect(
            sheet,
            new Size(3, 3),
            ANSWERS_RECT_RATIO
    );

    if (answersContour == null) {
      throw new DecodeException("DE0", "Cannot detect 'Answers' section");
    }

    answersContour.copyTo(answersSectionContour);
    OpenCvUtils.fourPointTransform(sheet, answersContour).copyTo(answersSection);
  }

  private void extractResponderSection() throws DecodeException {
    MatOfPoint responderContour = OpenCvUtils.detectRect(
            sheet,
            new Size(3, 3),
            RESPONDER_RECT_RATIO
    );

    if (responderContour == null) {
      throw new DecodeException("DE1", "Cannot detect 'Responder' section");
    }

    responderContour.copyTo(responderSectionContour);
    responderSection = OpenCvUtils.fourPointTransform(sheet, responderContour);
  }

  private List<Integer> recognizeCircles(Mat image, CirclesProcessor processor) {
    double answersSectionWidth = Imgproc.boundingRect(answersSectionContour).width;

    Mat grey = new Mat();
    Imgproc.cvtColor(image, grey, Imgproc.COLOR_BGR2GRAY);

    Mat thresh = new Mat();
    Imgproc.threshold(grey, thresh, 0, 255, Imgproc.THRESH_OTSU);
    Core.bitwise_not(thresh, thresh);

    List<MatOfPoint> contours = new ArrayList<>();
    Imgproc.findContours(
      thresh,
      contours,
      new Mat(),
      Imgproc.RETR_EXTERNAL,
      Imgproc.CHAIN_APPROX_SIMPLE
    );

    List<MatOfPoint> circles = new ArrayList<>();
    contours.forEach(cnt -> {
      Rect rect = Imgproc.boundingRect(cnt);

      double ration = (double)rect.width / rect.height;
      double sectionRation = answersSectionWidth / rect.width;

      if (
        OpenCvUtils.approximatelyEqual(ration, CIRCLE_RECT_RATIO, 0.1) &&
        OpenCvUtils.approximatelyEqual(sectionRation, ANSWERS_RECT_TO_CIRCLE_RATIO, 0.1)
      ) {
        circles.add(cnt);
      }
    });

    List<MatOfPoint> orderedCircles = processor.sort(circles);

    List<Integer> gradedCircles = new ArrayList<>(orderedCircles.size());
    for (int cIndex = 0; cIndex < orderedCircles.size(); cIndex++) {
      Mat mask = new Mat(thresh.size(), CvType.CV_8U, Scalar.all(0));
      Imgproc.drawContours(mask, orderedCircles, cIndex, new Scalar(255), -1);

      Mat dst = new Mat();
      Core.bitwise_and(thresh, thresh, dst, mask);

      int grade = Core.countNonZero(dst);
      gradedCircles.add(cIndex, grade);
    }

    return gradedCircles;
  }

  private void extractAnswers(List<Integer> gradedCircles) {
    int maxCircleGrade = Collections.max(gradedCircles);

    for (int i = 0; i < gradedCircles.size(); i++) {
      int grade = gradedCircles.get(i);

      if (grade > maxCircleGrade / 2) {
        int letterIndex = i % ANSWERS_OPTIONS_COUNT;
        int answerIndex  = Math.floorDiv(i, ANSWERS_OPTIONS_COUNT);

        decodedSheet.setAnswer(answerIndex, letterIndex);
      }
    }
  }

  private void detectAnswers() throws DecodeException {
    List<MatOfPoint> answersParts = OpenCvUtils.splitContourHorizontal(answersSectionContour);

    List<Integer> gradedCircles = new ArrayList<>();

    answersParts
      .stream()
      .map(part -> OpenCvUtils.fourPointTransform(sheet, part))
      .forEach(part -> gradedCircles
        .addAll(
          recognizeCircles(
            part,
            circles -> {
              circles.sort(sortByY);

              List<MatOfPoint> orderedCircles = new ArrayList<>();

              for (int i = 0; i < ANSWERS_COUNT / 2; i++) {
                int fromIndex = i * ANSWERS_OPTIONS_COUNT;
                int toIndex = (i + 1) * ANSWERS_OPTIONS_COUNT;

                List<MatOfPoint> subList = circles.subList(fromIndex, toIndex);
                subList.sort(sortByX);

                orderedCircles.addAll(subList);
              }

              return orderedCircles;
            }
          )
        )
      );

    if (gradedCircles.size() != ANSWERS_COUNT * ANSWERS_OPTIONS_COUNT) {
      throw new DecodeException("DE2", "Invalid `Circles` count detected: " + gradedCircles.size());
    }

    extractAnswers(gradedCircles);
  }

  private void extractResponderId(List<Integer> gradedCircles) {
    int maxCircleGrade = Collections.max(gradedCircles);

    for (int i = 0; i < gradedCircles.size(); i++) {
      int grade = gradedCircles.get(i);

      if (grade > maxCircleGrade / 2) {
        int responderIdPart = i % 10;
        int index  = Math.floorDiv(i, 10);

        decodedSheet.setResponderIdPart(index, responderIdPart);
      }
    }
  }

  private void detectResponderId() throws DecodeException {
    MatOfPoint responderIdCnt = OpenCvUtils.splitContourVertical(responderSectionContour).get(1);
    Mat responderIdImg = OpenCvUtils.fourPointTransform(sheet, responderIdCnt);
    List<Integer> gradedCircles = recognizeCircles(responderIdImg, circles -> {
      circles.sort(sortByY);

      List<MatOfPoint> orderedCircles = new ArrayList<>();

      for (int i = 0; i < RESPONDER_ID_LENGTH; i++) {
        int fromIndex = i * 10;
        int toIndex = (i + 1) * 10;

        List<MatOfPoint> subList = circles.subList(fromIndex, toIndex);
        subList.sort(sortByX);

        orderedCircles.addAll(subList);
      }

      return orderedCircles;
    });

    if (gradedCircles.size() != RESPONDER_ID_LENGTH * 10) {
      throw new DecodeException("DE3", "Invalid `Circles` count detected: " + gradedCircles.size());
    }

    extractResponderId(gradedCircles);
  }

  public DecodedSheet decode(String imageBase64) throws DecodeException {
    sheet = Base64Converter.base64ToMat(imageBase64);
    extractSheet();

    decodedSheet = new DecodedSheet(RESPONDER_ID_LENGTH, ANSWERS_COUNT);
    decodedSheet.setSheetBase64(Base64Converter.matToBase64(sheet));

    extractAnswersSection();
    detectAnswers();

    try {
      extractResponderSection();
      detectResponderId();
    } catch (DecodeException ignored) {}

    return decodedSheet;
  }

  private interface CirclesProcessor {
    List<MatOfPoint> sort(List<MatOfPoint> circles);
  }

  private static class DecodeException extends Exception {
    DecodeException (String code, String message) {
      super(code + ": " + message);
    }
  }
}
