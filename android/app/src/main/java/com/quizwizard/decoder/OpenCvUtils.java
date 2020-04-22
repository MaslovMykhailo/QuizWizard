package com.quizwizard.decoder;

import com.quizwizard.RNOpenCvLibraryModule;

import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.MatOfPoint2f;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Size;
import org.opencv.imgproc.Imgproc;
import org.opencv.imgproc.Moments;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

public class OpenCvUtils {

  private static double getContourRatio(MatOfPoint cnt) {
    Rect boundingRect = Imgproc.boundingRect(cnt);
    return (double)boundingRect.width / boundingRect.height;
  }

  static class SortByX implements Comparator<Point> {
    public int compare(Point p1, Point p2) {
      return (int)(p1.x - p2.x);
    }
  }

  static class SortByY implements Comparator<Point> {
    public int compare(Point p1, Point p2) {
      return (int)(p1.y - p2.y);
    }
  }

  private static List<Point> orderRectPoints(MatOfPoint cnt) {
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

    Point[] ordered = {tl, tr, bl, br};
    return Arrays.asList(ordered);
  }

  public static Mat fourPointTransform(Mat image, MatOfPoint cnt) {
    List<Point> ordered = orderRectPoints(cnt);

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

  public static List<MatOfPoint> splitContourHorizontal(MatOfPoint cnt) {
    List<Point> ordered = orderRectPoints(cnt);

    Point tl = ordered.get(0);
    Point tr = ordered.get(1);
    Point bl = ordered.get(2);
    Point br = ordered.get(3);

    Point tMedian = new Point((tl.x + tr.x) / 2, (tl.y + tr.y) / 2);
    Point bMedian = new Point((bl.x + br.x) / 2, (bl.y + br.y) / 2);

    List<MatOfPoint> parts = new ArrayList<>();
    parts.add(new MatOfPoint(tl, tMedian, bl, bMedian));
    parts.add(new MatOfPoint(tMedian, tr, bMedian, br));

    return parts;
  }

  public static MatOfPoint detectRect(Mat image, Size blurSize, double approxRatio) {
    Mat grey = new Mat();
    Imgproc.cvtColor(image, grey, Imgproc.COLOR_BGR2GRAY);

    Mat blurred = new Mat();
    Imgproc.GaussianBlur(grey, blurred, blurSize, 0, 0);

    Mat edged = new Mat();
    Imgproc.Canny(blurred, edged, 75, 200);

    ArrayList<MatOfPoint> contours = new ArrayList<>();
    Imgproc.findContours(
            edged,
            contours,
            new Mat(),
            Imgproc.RETR_EXTERNAL,
            Imgproc.CHAIN_APPROX_SIMPLE
    );

    Optional<MatOfPoint> detectedRect = contours
      .stream()
      .sorted(new SortUtils.SortByContourArea().reversed())
      .map(contour -> {
        MatOfPoint2f cnt = new MatOfPoint2f(contour.toArray());
        double peri = Imgproc.arcLength(cnt, true);

        MatOfPoint2f approxCnt = new MatOfPoint2f();
        Imgproc.approxPolyDP(cnt, approxCnt, 0.02 * peri, true);

        return new MatOfPoint(approxCnt.toArray());
      })
      .filter(approxCnt -> {
        if (approxCnt.toList().size() != 4) {
          return false;
        }

        double ratio = getContourRatio(approxCnt);
        return approximatelyEqual(ratio, approxRatio, 0.1);
      })
      .findFirst();

    return detectedRect.orElse(null);
  }

  private static Point getContourCenter(MatOfPoint cnt) {
    Moments m = Imgproc.moments(cnt);
    return new Point(m.m10 / m.m00, m.m01 / m.m00);
  }

  public static boolean approximatelyEqual(double value, double equalTo, double thresholdP) {
    double threshold = equalTo * thresholdP;
    return equalTo - threshold <= value && equalTo + threshold >= value;
  }
}
