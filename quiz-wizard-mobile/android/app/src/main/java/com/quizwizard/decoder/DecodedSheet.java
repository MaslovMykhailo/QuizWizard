package com.quizwizard.decoder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DecodedSheet {
  private static final int LETTER_CHAR_OFFSET = 65;

  DecodedSheet(int responderIdLength, int answersCount) {
    responderId  = new ArrayList<>(responderIdLength);
    for (int index = 0; index < responderIdLength; index++) {
      responderId.add(new HashSet<>());
    }

    answers = new ArrayList<>(answersCount);
    for (int index = 0; index < answersCount; index++) {
      answers.add(new HashSet<>());
    }
  }
  private List<Set<Integer>> responderId;

  public List<Set<Integer>> getResponderId() {
    return responderId;
  }

  void setResponderIdPart(int index, int responderIdPart) {
    responderId.get(index).add(responderIdPart);
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
