package com.quizwizard.dto;

import com.quizwizard.dao.QuestionOptionDao;

import java.util.UUID;

public class QuestionOptionDto {

    private UUID id;

    private String option;

    private String text;

    private Boolean correct;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public static QuestionOptionDto daoToDto(QuestionOptionDao dao) {
        QuestionOptionDto dto = new QuestionOptionDto();
        dto.setId(dao.getId());
        dto.setText(dao.getText());
        dto.setOption(dao.getQuestionOption().toString());
        dto.setCorrect(dao.getIsCorrect());
        return dto;
    }

    public static QuestionOptionDao dtoToDao(QuestionOptionDto dto) {
        QuestionOptionDao dao = new QuestionOptionDao();
        dao.setId(dto.getId());
        dao.setText(dto.getText());
        dao.setQuestionOption(dto.getOption().charAt(0));
        dao.setIsCorrect(dto.getCorrect());
        return dao;
    }

}
