package com.quizwizard.dao;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "qw_questions")
public class QuestionDao {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String text;

    @Column
    private String picture;

    @Column(nullable = false)
    private Number cost;

    @Column
    private Boolean partialAnswer;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "question_id")
    private List<QuestionOptionDao> questionOptions = new ArrayList<>();

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

    public List<QuestionOptionDao> getQuestionOptions() {
        return questionOptions;
    }

    public void setQuestionOptions(List<QuestionOptionDao> questionOptions) {
        this.questionOptions = questionOptions;
    }

}
