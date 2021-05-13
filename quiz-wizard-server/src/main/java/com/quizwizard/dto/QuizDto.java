package com.quizwizard.dto;

import com.quizwizard.dao.QuizDao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class QuizDto {

    private UUID id;

    private String name;

    private String description;

    private Date creationDate;

    private List<QuestionDto> questions = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public List<QuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDto> questions) {
        this.questions = questions;
    }

    public static QuizDto daoToDto(QuizDao dao) {
        QuizDto dto = new QuizDto();
        dto.setId(dao.getId());
        dto.setName(dao.getName());
        dto.setDescription(dao.getDescription());
        dto.setCreationDate(dao.getCreationDate());
        dto.setQuestions(dao
            .getQuestions()
            .stream()
            .map(QuestionDto::daoToDto)
            .collect(Collectors.toList())
        );
        return dto;
    }

    public static QuizDao dtoToDao(QuizDto dto) {
        QuizDao dao = new QuizDao();
        dao.setId(dto.getId());
        dao.setName(dto.getName());
        dao.setDescription(dto.getDescription());
        dao.setCreationDate(dto.getCreationDate());
        dao.setQuestions(dto
            .getQuestions()
            .stream()
            .map(QuestionDto::dtoToDao)
            .collect(Collectors.toList())
        );
        return dao;
    }

}
