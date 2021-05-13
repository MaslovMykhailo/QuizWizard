package com.quizwizard.dao;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "qw_answer_checks")
public class AnswerCheckDao {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private Character option;

    @Column
    private Boolean correct;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuestionDao question;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Character getOption() {
        return option;
    }

    public void setOption(Character option) {
        this.option = option;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public QuestionDao getQuestion() {
        return question;
    }

    public void setQuestion(QuestionDao question) {
        this.question = question;
    }

}
