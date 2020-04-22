package com.quizwizard.decoder;

import org.opencv.core.MatOfPoint;
import org.opencv.core.Point;
import org.opencv.imgproc.Imgproc;
import org.opencv.imgproc.Moments;

import java.util.Comparator;

class SortUtils {
  public static class SortByContourArea implements Comparator<MatOfPoint> {
    public int compare(MatOfPoint mat1, MatOfPoint mat2) {
      double area1 = Imgproc.contourArea(mat1);
      double area2 = Imgproc.contourArea(mat2);
      return Double.compare(area1, area2);
    }
  }

  public static class SortContoursTopToBottom implements Comparator<MatOfPoint> {
    public int compare(MatOfPoint cnt1, MatOfPoint cnt2) {
      Point c1 = getContourCenter(cnt1);
      Point c2 = getContourCenter(cnt2);
      return new SortByXY().compare(c1, c2);
    }

    private static Point getContourCenter(MatOfPoint cnt) {
      Moments m = Imgproc.moments(cnt);
      return new Point(m.m10 / m.m00, m.m01  /m.m00);
    }
  }

  public static class SortByXY implements Comparator<Point> {
    public int compare(Point p1, Point p2) {
      if (p1.x == p2.x && p1.y == p2.y) {
        return 0;
      } else if (p1.x < p2.x || (p1.x >= p2.x && p1.y < p2.y)) {
        return -1;
      } else {
        return 1;
      }
    }
  }
}
