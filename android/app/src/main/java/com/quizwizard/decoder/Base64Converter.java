package com.quizwizard.decoder;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import org.opencv.android.Utils;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;

class Base64Converter {
  static Mat base64ToMat(String imageBase64) {
    byte[] imageDecoded = Base64.decode(imageBase64, Base64.DEFAULT);
    Bitmap imageBitmap = BitmapFactory.decodeByteArray(imageDecoded, 0, imageDecoded.length);

    Mat imageMat = new Mat();
    Utils.bitmapToMat(imageBitmap, imageMat);

    return imageMat;
  }

  static String matToBase64(Mat imageMat) {
    MatOfByte matOfByte = new MatOfByte();
    Imgcodecs.imencode(".jpeg", imageMat, matOfByte);

    return Base64.encodeToString(matOfByte.toArray(), Base64.DEFAULT);
  }
}
