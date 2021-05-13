package com.quizwizard.dto;

import com.quizwizard.dao.QuestionDao;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class QuestionDto {

    private UUID id;

    private String text;

    private String picture;

    private Number cost;

    private Boolean partialAnswer;

    private List<QuestionOptionDto> questionOptions = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Number getCost() {
        return cost;
    }

    public void setCost(Number cost) {
        this.cost = cost;
    }

    public Boolean getPartialAnswer() {
        return partialAnswer;
    }

    public void setPartialAnswer(Boolean partialAnswer) {
        this.partialAnswer = partialAnswer;
    }

    public List<QuestionOptionDto> getQuestionOptions() {
        return questionOptions;
    }

    public void setQuestionOptions(List<QuestionOptionDto> questionOptions) {
        this.questionOptions = questionOptions;
    }

    public static QuestionDto daoToDto(QuestionDao dao) {
        QuestionDto dto = new QuestionDto();
        dto.setId(dao.getId());
        dto.setText(dao.getText());
        dto.setCost(dao.getCost());
        dto.setPicture(dao.getPicture());
        dto.setPartialAnswer(dao.getPartialAnswer());
        dto.setQuestionOptions(dao
            .getQuestionOptions()
            .stream()
            .map(QuestionOptionDto::daoToDto)
            .collect(Collectors.toList())
        );
        return dto;
    }

    public static QuestionDao dtoToDao(QuestionDto dto) {
        QuestionDao dao = new QuestionDao();
        dao.setId(dto.getId());
        dao.setText(dto.getText());
        dao.setCost(dto.getCost());
        dao.setPicture(dto.getPicture());
        dao.setPartialAnswer(dto.getPartialAnswer());
        dao.setQuestionOptions(dto
            .getQuestionOptions()
            .stream()
            .map(QuestionOptionDto::dtoToDao)
            .collect(Collectors.toList())
        );
        return dao;
    }


}
