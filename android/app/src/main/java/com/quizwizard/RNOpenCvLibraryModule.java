package com.quizwizard;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import org.opencv.android.Utils;
import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfPoint;
import org.opencv.core.MatOfPoint2f;
import org.opencv.core.MatOfPoint3;
import org.opencv.core.MatOfPoint3f;
import org.opencv.core.Point;
import org.opencv.core.Point3;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.imgproc.Moments;

import android.util.Base64;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.OptionalInt;
import java.util.stream.Collectors;

public class RNOpenCvLibraryModule extends ReactContextBaseJavaModule {

  private static ReactApplicationContext reactContext;

  public RNOpenCvLibraryModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "RNOpenCvLibrary";
  }

  @ReactMethod
  public void checkForBlurryImage(String imageAsBase64, Callback errorCallback, Callback successCallback) {
    try {
      BitmapFactory.Options options = new BitmapFactory.Options();
      options.inDither = true;
      options.inPreferredConfig = Bitmap.Config.ARGB_8888;

      byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
      Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);


//      Bitmap image = decodeSampledBitmapFromFile(imageurl, 2000, 2000);
      int l = CvType.CV_8UC1; //8-bit grey scale image
      Mat matImage = new Mat();
      Utils.bitmapToMat(image, matImage);
      Mat matImageGrey = new Mat();
      Imgproc.cvtColor(matImage, matImageGrey, Imgproc.COLOR_BGR2GRAY);

      Bitmap destImage;
      destImage = Bitmap.createBitmap(image);
      Mat dst2 = new Mat();
      Utils.bitmapToMat(destImage, dst2);
      Mat laplacianImage = new Mat();
      dst2.convertTo(laplacianImage, l);
      Imgproc.Laplacian(matImageGrey, laplacianImage, CvType.CV_8U);
      Mat laplacianImage8bit = new Mat();
      laplacianImage.convertTo(laplacianImage8bit, l);

      Bitmap bmp = Bitmap.createBitmap(laplacianImage8bit.cols(), laplacianImage8bit.rows(), Bitmap.Config.ARGB_8888);
      Utils.matToBitmap(laplacianImage8bit, bmp);
      int[] pixels = new int[bmp.getHeight() * bmp.getWidth()];
      bmp.getPixels(pixels, 0, bmp.getWidth(), 0, 0, bmp.getWidth(), bmp.getHeight());
      int maxLap = -16777216; // 16m
      for (int pixel : pixels) {
        if (pixel > maxLap)
          maxLap = pixel;
      }

//            int soglia = -6118750;
      int soglia = -8118750;
      if (maxLap <= soglia) {
        System.out.println("is blur image");
      }

      successCallback.invoke(maxLap <= soglia);
    } catch (Exception e) {
      errorCallback.invoke(e.getMessage());
    }
  }

  @ReactMethod
  public void detectCircles(String imageAsBase64, Callback errorCallback, Callback successCallback) {
    try {
      byte[] decodedString = Base64.decode(imageAsBase64, Base64.DEFAULT);
      Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

      Mat matImage = new Mat();
      Utils.bitmapToMat(image, matImage);

      Mat matImageGrey = new Mat();
      Imgproc.cvtColor(matImage, matImageGrey, Imgproc.COLOR_BGR2GRAY);

      // reduce noise
      Imgproc.medianBlur(matImageGrey, matImageGrey, 5);

      Mat circlesMat = new Mat();
      Imgproc.HoughCircles(
        matImageGrey,
        circlesMat,
        Imgproc.HOUGH_GRADIENT,
        1.0,
        15, // change this value to detect circles with different distances to each other
        100.0, 30.0, 40, 75 // change the last two parameter (min_radius & max_radius) to detect larger circles
      );

      String res = "";

      int count = 0;
      for (int x = 0; x < circlesMat.cols(); x++) {
        double[] c = circlesMat.get(0, x);
        Point center = new Point(Math.round(c[0]), Math.round(c[1]));
        int radius = (int) Math.round(c[2]);

        byte[] p = new byte [1];
        matImageGrey.get((int)center.x, (int)center.y, p);

        // circle center
        Imgproc.circle(matImageGrey, center, 1, new Scalar(0, 255, 0), 3, 8, 0 );
        // circle outline
        Imgproc.circle(matImageGrey, center, radius, new Scalar(0, 0, 255), 3, 8, 0 );

//        res = res.concat("[");
//        res = res.concat(String.valueOf(center.x));
//        res = res.concat(",");
//        res = res.concat(String.valueOf(center.y));
//        res = res.concat(",");
//        res = res.concat(String.valueOf(radius));
//        res = res.concat("]");
        count++;
      }

      res = res.concat("==>" + count);

      //
      //  Core.bitwise_not(matImageGrey, matImageGrey);
      //

      MatOfByte matOfByte = new MatOfByte();
      Imgcodecs.imencode(".jpeg", matImageGrey, matOfByte);

      String base64 = Base64.encodeToString(matOfByte.toArray(), Base64.DEFAULT);

      successCallback.invoke(base64, res);
    } catch (Exception e) {
      errorCallback.invoke(e.getMessage());
    }
  }

  private static Mat base64ToMat(String imageBase64) {
    byte[] imageDecoded = Base64.decode(imageBase64, Base64.DEFAULT);
    Bitmap imageBitmap = BitmapFactory.decodeByteArray(imageDecoded, 0, imageDecoded.length);

    Mat imageMat = new Mat();
    Utils.bitmapToMat(imageBitmap, imageMat);

    return imageMat;
  }

  private static String matToBase64(Mat imageMat, String ext) {
    MatOfByte matOfByte = new MatOfByte();
    Imgcodecs.imencode(".".concat(ext), imageMat, matOfByte);

    return Base64.encodeToString(matOfByte.toArray(), Base64.DEFAULT);
  }

  private static boolean approximatelyEqual(double value, double equalTo, double thresholdPercent) {
    double threshold = equalTo * thresholdPercent;
    return equalTo - threshold <= value && equalTo + threshold >= value;
  }

  private static double getRectRatio(List<Point> rect) {
    ArrayList<Point> points = new ArrayList<>(rect);

    points.sort(new SortByY());
    double width = points.get(1).x - points.get(0).x;

    points.sort(new SortByX());
    double height = points.get(1).y - points.get(0).y;

    return Math.abs(width / height);
  }

  static class SortByContourArea implements Comparator<MatOfPoint> {
    public int compare(MatOfPoint mat1, MatOfPoint mat2) {
      return (int)(Imgproc.contourArea(mat2) - Imgproc.contourArea(mat1));
    }
  }

  static class SortByX implements  Comparator<Point> {
    public int compare(Point p1, Point p2) {
      return (int)(p1.x - p2.x);
    }
  }

  static class SortByY implements  Comparator<Point> {
    public int compare(Point p1, Point p2) {
      return (int)(p1.y - p2.y);
    }
  }

  static class SortByXY implements Comparator<Point> {
    public int compare(Point p1, Point p2) {
      if (p1.x == p2.x && p1.y == p2.y) {
        return 0;
      } else if (p1.x <= p2.x || (p1.x >= p2.x && p1.y <= p2.y)) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  static class SortContoursTopToBottom implements Comparator<MatOfPoint> {
    public int compare(MatOfPoint cnt1, MatOfPoint cnt2) {
      Point c1 = getContourCenter(cnt1);
      Point c2 = getContourCenter(cnt2);
      return new SortByXY().compare(c1, c2);
    }
  }


  private static MatOfPoint2f orderRectPoints(MatOfPoint2f cnt) {
    List<Point> points = cnt.toList();

    points.sort(new SortByY());
    List<Point> topPoints = new ArrayList<>(points.subList(0, 2));
    List<Point> bottomPoints = new ArrayList<>(points.subList(2, 4));

    topPoints.sort(new SortByX());
    Point tl = topPoints.get(0);
    Point tr = topPoints.get(1);

    bottomPoints.sort(new SortByX());
    Point bl = bottomPoints.get(0);
    Point br = bottomPoints.get(1);

    return new MatOfPoint2f(tl, tr, bl, br);
  }

  private static Mat fourPointTransform(Mat image, MatOfPoint2f cnt) {
    List<Point> ordered = orderRectPoints(cnt).toList();
    Point tl = ordered.get(0);
    Point tr = ordered.get(1);
    Point bl = ordered.get(2);
    Point br = ordered.get(3);

    double widthA = Math.sqrt(Math.pow(br.x - bl.x, 2) + Math.pow(br.y - bl.y, 2));
    double widthB = Math.sqrt(Math.pow(tr.x - tl.x, 2) + Math.pow(tr.y - tl.y, 2));
    int width = (int) Math.max(widthA, widthB);

    double heightA = Math.sqrt(Math.pow(tr.x - br.x, 2) + Math.pow(tr.y - br.y, 2));
    double heightB = Math.sqrt(Math.pow(tl.x - bl.x, 2) + Math.pow(tl.y - bl.y, 2));
    int height = (int) Math.max(heightA, heightB);

    Mat dimensions = new MatOfPoint2f(
            new Point(0, 0),
            new Point(width - 1, 0),
            new Point(width - 1, height - 1),
            new Point(0, height - 1)
    );
    MatOfPoint2f rect = new MatOfPoint2f(tl, tr, br, bl);
    Mat warpMat = Imgproc.getPerspectiveTransform(rect, dimensions);

    Mat warped = new Mat();
    Imgproc.warpPerspective(image, warped, warpMat, new Size(width, height));

    return warped;
  }

  private static List<MatOfPoint2f> splitContourHorizontal(MatOfPoint2f cnt) {
    List<Point> ordered = orderRectPoints(cnt).toList();
    Point tl = ordered.get(0);
    Point tr = ordered.get(1);
    Point bl = ordered.get(2);
    Point br = ordered.get(3);

    Point tMedian = new Point((tl.x + tr.x) / 2, (tl.y + tr.y) / 2);
    Point bMedian = new Point((bl.x + br.x) / 2, (bl.y + br.y) / 2);

    List<MatOfPoint2f> parts = new ArrayList<>();
    parts.add(new MatOfPoint2f(tl, tMedian, bl, bMedian));
    parts.add(new MatOfPoint2f(tMedian, tr, bMedian, br));
    return parts;
  }

  private static MatOfPoint2f detectRect(Mat image, Size blurSize, double approxRatio) {
    Mat grey = new Mat();
    Imgproc.cvtColor(image, grey, Imgproc.COLOR_BGR2GRAY);

    Mat blurred = new Mat();
    Imgproc.GaussianBlur(grey, blurred, blurSize, 0, 0);

    Mat edged = new Mat();
    Imgproc.Canny(blurred, edged, 75, 200);

    ArrayList<MatOfPoint> cnts = new ArrayList<>();
    Imgproc.findContours(
      edged,
      cnts,
      new Mat(),
      Imgproc.RETR_EXTERNAL,
      Imgproc.CHAIN_APPROX_SIMPLE
    );

    cnts.sort(new SortByContourArea());

    MatOfPoint2f rectCnt = new MatOfPoint2f();
    for (int cntIndex = 0; cntIndex < cnts.size(); cntIndex++) {
      MatOfPoint2f cnt = new MatOfPoint2f(cnts.get(cntIndex).toArray());
      double peri = Imgproc.arcLength(cnt, true);

      MatOfPoint2f approxCnt = new MatOfPoint2f();
      Imgproc.approxPolyDP(cnt, approxCnt, 0.02 * peri, true);

      List<Point> points = approxCnt.toList();
      if (points.size() == 4) {
        double ratio = getRectRatio(points);

        if (approximatelyEqual(ratio, approxRatio, 0.05)) {
          approxCnt.copyTo(rectCnt);
          break;
        }
      }
    }

    return rectCnt;
  }

  private static Point getContourCenter(MatOfPoint cnt) {
    Moments m = Imgproc.moments(cnt);
    return new Point(m.m10/m.m00, m.m01/m.m00);
  }

  @ReactMethod
  public void processImage(String imageBase64, Callback errorCallback, Callback successCallback) {
    try {
      Mat image = base64ToMat(imageBase64);

      MatOfPoint2f sheetCnt = detectRect(image, new Size(5, 5), 0.7);
      Mat sheetImage = fourPointTransform(image, sheetCnt);

      MatOfPoint2f answersCnt = detectRect(sheetImage, new Size(3, 3), 1);

//      MatOfPoint2f responderCnt = detectRect(sheetImage, new Size(3, 3), 1.36);
//      drawContour(sheetImage, responderCnt);

      Mat answersImage = fourPointTransform(sheetImage, answersCnt);
      int answersSheetSize = Imgproc.boundingRect(answersCnt).width;

      MatOfPoint2f leftAnswersCnt = splitContourHorizontal(answersCnt).get(0);
      Mat leftAnswersImage = fourPointTransform(sheetImage, leftAnswersCnt);

      Mat grey = new Mat();
      Imgproc.cvtColor(leftAnswersImage, grey, Imgproc.COLOR_BGR2GRAY);

      Mat thresh = new Mat();
      Imgproc.threshold(grey, thresh, 0, 255, Imgproc.THRESH_OTSU);
      Core.bitwise_not(thresh, thresh);

      List<MatOfPoint> cnts = new ArrayList<>();
      Imgproc.findContours(thresh, cnts, new Mat(), Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);

      List<MatOfPoint> circles = new ArrayList<>();
      cnts.forEach(cnt -> {
        Rect rect = Imgproc.boundingRect(cnt);

        double ration = rect.width / (double)rect.height;
        double sheetRation = answersSheetSize / (double)rect.width;

        if (
          approximatelyEqual(ration, 1, 0.05) &&
          approximatelyEqual(sheetRation, 21, 0.1)
        ) {
          circles.add(cnt);
        }
      });

      circles.sort(new SortContoursTopToBottom());

      String[][] result = new String[circles.size() / 5][];
      for (int i = 0; i < result.length; i++) {
        result[i] = new String[5];
      }

      int[] circleGrades = new int[circles.size()];

      for (int cIndex = 0; cIndex < circles.size(); cIndex++) {
        Mat mask = new Mat(thresh.size(), CvType.CV_8U, Scalar.all(0));
        Imgproc.drawContours(mask, circles, cIndex, new Scalar(255), -1);

        Mat dst = new Mat();
        Core.bitwise_and(thresh, thresh, dst, mask);

        int total = Core.countNonZero(dst);
        circleGrades[cIndex] = total;
      }

      int maxCircleGrade = Arrays.stream(circleGrades).max().getAsInt();

      for (int i = 0; i < circleGrades.length; i++) {
        int grade = circleGrades[i];
        if (grade > maxCircleGrade / 2) {
          int letterIndex = i % 5;
          int resultIndex  = Math.floorDiv(i, 5);
          result[resultIndex][letterIndex] = String.valueOf((char)(letterIndex + 65));
        }
      }

      String resultBase64 = matToBase64(leftAnswersImage, "jpeg");
      successCallback.invoke(resultBase64, Arrays.deepToString(result));
    } catch (Exception e) {
      errorCallback.invoke(e.getMessage());
    }
  }

  private static void drawContour(Mat image, MatOfPoint2f cnt) {
      List<Point> blankCntPoint = cnt.toList();
      for (int pIndex = 0; pIndex < blankCntPoint.size(); pIndex++) {
          Imgproc.line(
                  image,
                  blankCntPoint.get(pIndex),
                  blankCntPoint.get(pIndex == blankCntPoint.size() - 1 ? 0 : pIndex + 1),
                  new Scalar(220, 20, 60),
                  10
          );
      }
  }
}