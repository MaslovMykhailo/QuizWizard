package com.quizwizard.dao;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "qw_answers")
public class AnswerDao {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private QuizDao quiz;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentDao student;

    @Column
    @Temporal(TemporalType.DATE)
    private Date creationDate;

    @Column
    private String sheet;

    @Column
    private Number result;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "answer_id")
    private List<AnswerCheckDao> checks = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public QuizDao getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizDao quiz) {
        this.quiz = quiz;
    }

    public StudentDao getStudent() {
        return student;
    }

    public void setStudent(StudentDao student) {
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

    public List<AnswerCheckDao> getChecks() {
        return checks;
    }

    public void setChecks(List<AnswerCheckDao> checks) {
        this.checks = checks;
    }

}
