package com.quizwizard.dto;

import java.util.Map;
import java.util.List;

public class AnalyticDto {

    public Map<GroupDto, AnalyticByGroupDto> getAnalyticByGroups() {
        return analyticByGroups;
    }

    public void setAnalyticByGroups(Map<GroupDto, AnalyticByGroupDto> analyticByGroups) {
        this.analyticByGroups = analyticByGroups;
    }

    public Map<QuizDto, AnalyticByQuizDto> getAnalyticByQuizzes() {
        return analyticByQuizzes;
    }

    public void setAnalyticByQuizzes(Map<QuizDto, AnalyticByQuizDto> analyticByQuizzes) {
        this.analyticByQuizzes = analyticByQuizzes;
    }

    private Map<GroupDto, AnalyticByGroupDto> analyticByGroups;

    private Map<QuizDto, AnalyticByQuizDto> analyticByQuizzes;

    public static class AnalyticByGroupDto {

        public GroupDto getGroup() {
            return group;
        }

        public void setGroup(GroupDto group) {
            this.group = group;
        }

        public Map<StudentDto, Map<QuizDto, AnswerDto>> getResults() {
            return results;
        }

        public void setResults(Map<StudentDto, Map<QuizDto, AnswerDto>> results) {
            this.results = results;
        }

        public Map<StudentDto, Number> getAverageResult() {
            return averageResult;
        }

        public void setAverageResult(Map<StudentDto, Number> averageResult) {
            this.averageResult = averageResult;
        }

        private GroupDto group;

        private Map<StudentDto, Map<QuizDto, AnswerDto>> results;

        private Map<StudentDto, Number> averageResult;

    }

    public static class AnalyticByQuizDto {

        public Number getAnswerCount() {
            return answerCount;
        }

        public void setAnswerCount(Number answerCount) {
            this.answerCount = answerCount;
        }

        public Number getAverageResult() {
            return averageResult;
        }

        public void setAverageResult(Number averageResult) {
            this.averageResult = averageResult;
        }

        public Number getBestResult() {
            return bestResult;
        }

        public void setBestResult(Number bestResult) {
            this.bestResult = bestResult;
        }

        public Number getWorstResult() {
            return worstResult;
        }

        public void setWorstResult(Number worstResult) {
            this.worstResult = worstResult;
        }

        public List<AnswerDto> getAnswers() {
            return answers;
        }

        public void setAnswers(List<AnswerDto> answers) {
            this.answers = answers;
        }

        public QuizDto getQuiz() {
            return quiz;
        }

        public void setQuiz(QuizDto quiz) {
            this.quiz = quiz;
        }

        private Number answerCount;

        private Number averageResult;

        private Number bestResult;

        private Number worstResult;

        private List<AnswerDto> answers;

        private QuizDto quiz;

    }

}
