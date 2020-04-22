package com.quizwizard.decoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DecodedSheet {
  private static final int LETTER_CHAR_OFFSET = 65;

  DecodedSheet(int responderIdLength, int answersCount) {
    responderId  = new int[responderIdLength];
    Arrays.fill(responderId, -1);

    answers = new ArrayList<>(answersCount);
    for (int index = 0; index < answersCount; index++) {
      answers.add(new HashSet<>());
    }
  }

  /**
   * Identifier of Responder
   * Can contain [0-9] or -1
   * [0-9] means that part of `responderId` was detected successfully
   * -1 means that part of `responderId` was not detected
  **/
  private int[] responderId;

  public int[] getResponderId() {
    return responderId;
  }

  public void setResponderIdPart(int index, int responderIdPart) {
    responderId[index] = responderIdPart;
  }

  private List<Set<String>> answers;

  void setAnswer(int answerIndex, int letterIndex) {
    answers
      .get(answerIndex)
      .add(String.valueOf((char)(letterIndex + LETTER_CHAR_OFFSET)));
  }

  private String sheetBase64 = "";

  public String getSheetBase64() {
    return sheetBase64;
  }

  void setSheetBase64(String sheetBase64) {
    this.sheetBase64 = sheetBase64;
  }
}
