package com.quizwizard;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.google.gson.Gson;
import com.quizwizard.decoder.DecodedSheet;
import com.quizwizard.decoder.Decoder;

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

  private Gson gson = new Gson();

  private Decoder decoder = new Decoder();

  @ReactMethod
  public void decodeImage(String imageBase64, Callback errorCallback, Callback successCallback) {
    try {
      DecodedSheet decoded = decoder.decode(imageBase64);
      System.out.println(gson.toJson(decoded));
      successCallback.invoke(gson.toJson(decoded));
    } catch (Exception e) {
      errorCallback.invoke(e.getMessage());
    }
  }
}