package com.quizwizard.dao;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
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
    private Character answerOption;

    @Column
    private Boolean isCorrect;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private QuestionDao question;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Character getAnswerOption() {
        return answerOption;
    }

    public void setAnswerOption(Character option) {
        this.answerOption = option;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean correct) {
        this.isCorrect = correct;
    }

    public QuestionDao getQuestion() {
        return question;
    }

    public void setQuestion(QuestionDao question) {
        this.question = question;
    }

}
