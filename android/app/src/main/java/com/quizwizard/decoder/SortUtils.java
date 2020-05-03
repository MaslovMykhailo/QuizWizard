package com.quizwizard.decoder;

import org.opencv.core.MatOfPoint;
import org.opencv.core.Point;
import org.opencv.imgproc.Imgproc;

import java.util.Comparator;

class SortUtils {
  public static class SortByX implements Comparator<Point> {
    public int compare(Point p1, Point p2) {
      return Double.compare(p1.x, p2.x);
    }
  }

  public static class SortByY implements Comparator<Point> {
    public int compare(Point p1, Point p2) {
      return Double.compare(p1.y, p2.y);
    }
  }

  public static class SortByContourArea implements Comparator<MatOfPoint> {
    public int compare(MatOfPoint mat1, MatOfPoint mat2) {
      double area1 = Imgproc.contourArea(mat1);
      double area2 = Imgproc.contourArea(mat2);
      return Double.compare(area1, area2);
    }
  }

  public static class SortContoursByY implements Comparator<MatOfPoint> {
    private Comparator<Point> sortByY = new SortByY();

    public int compare(MatOfPoint cnt1, MatOfPoint cnt2) {
      Point p1 = Imgproc.boundingRect(cnt1).tl();
      Point p2 = Imgproc.boundingRect(cnt2).tl();
      return sortByY.compare(p1, p2);
    }
  }

  public static class SortContoursByX implements Comparator<MatOfPoint> {
    private Comparator<Point> sortByX = new SortByX();

    public int compare(MatOfPoint cnt1, MatOfPoint cnt2) {
      Point p1 = Imgproc.boundingRect(cnt1).tl();
      Point p2 = Imgproc.boundingRect(cnt2).tl();
      return sortByX.compare(p1, p2);
    }
  }
}
