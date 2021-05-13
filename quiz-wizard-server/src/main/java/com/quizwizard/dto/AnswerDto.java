package com.quizwizard.dto;

import com.quizwizard.dao.AnswerDao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class AnswerDto {

    private UUID id;

    private QuizDto quiz;

    private StudentDto student;

    private Date creationDate;

    private String sheet;

    private Number result;

    private List<AnswerCheckDto> checks = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public QuizDto getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizDto quiz) {
        this.quiz = quiz;
    }

    public StudentDto getStudent() {
        return student;
    }

    public void setStudent(StudentDto student) {
        this.student = student;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getSheet() {
        return sheet;
    }

    public void setSheet(String sheet) {
        this.sheet = sheet;
    }

    public Number getResult() {
        return result;
    }

    public void setResult(Number result) {
        this.result = result;
    }

    public List<AnswerCheckDto> getChecks() {
        return checks;
    }

    public void setChecks(List<AnswerCheckDto> checks) {
        this.checks = checks;
    }

    public static AnswerDto daoToDto(AnswerDao dao) {
        AnswerDto dto = new AnswerDto();
        dto.setId(dao.getId());
        dto.setSheet(dao.getSheet());
        dto.setResult(dao.getResult());
        dto.setCreationDate(dao.getCreationDate());
        dto.setQuiz(QuizDto.daoToDto(dao.getQuiz()));
        dto.setStudent(StudentDto.daoToDto(dao.getStudent()));
        dto.setChecks(dao
            .getChecks()
            .stream()
            .map(AnswerCheckDto::daoToDto)
            .collect(Collectors.toList())
        );
        return dto;
    }

    public static AnswerDao dtoToDao(AnswerDto dto) {
        AnswerDao dao = new AnswerDao();
        dao.setId(dto.getId());
        dao.setSheet(dto.getSheet());
        dao.setResult(dto.getResult());
        dao.setCreationDate(dto.getCreationDate());
        dao.setQuiz(QuizDto.dtoToDao(dto.getQuiz()));
        dao.setStudent(StudentDto.dtoToDao(dto.getStudent()));
        dao.setChecks(dto
            .getChecks()
            .stream()
            .map(AnswerCheckDto::dtoToDao)
            .collect(Collectors.toList())
        );
        return dao;
    }

}
