package com.quizwizard.dto;

import com.quizwizard.dao.AnswerCheckDao;

import java.util.UUID;

public class AnswerCheckDto {

    private UUID id;

    private String option;

    private Boolean correct;

    private QuestionDto question;

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

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public QuestionDto getQuestion() {
        return question;
    }

    public void setQuestion(QuestionDto question) {
        this.question = question;
    }

    public static AnswerCheckDto daoToDto(AnswerCheckDao dao) {
        AnswerCheckDto dto = new AnswerCheckDto();
        dto.setId(dao.getId());
        dto.setOption(dao.getAnswerOption().toString());
        dto.setCorrect(dao.getIsCorrect());
        dto.setQuestion(QuestionDto.daoToDto(dao.getQuestion()));
        return dto;
    }

    public static AnswerCheckDao dtoToDao(AnswerCheckDto dto) {
        AnswerCheckDao dao = new AnswerCheckDao();
        dao.setId(dao.getId());
        dao.setAnswerOption(dto.getOption().charAt(0));
        dao.setIsCorrect(dto.getCorrect());
        dao.setQuestion(QuestionDto.dtoToDao(dto.getQuestion()));
        return dao;
    }

}
