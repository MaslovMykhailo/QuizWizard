package com.quizwizard.service;

import com.quizwizard.dto.QuizDto;
import com.quizwizard.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    public List<QuizDto> getQuizzes() {
        // TODO: implement
        return null;
    }

    public QuizDto getQuiz(UUID id) {
        // TODO: implement
        return null;
    }

    public QuizDto createQuiz(QuizDto dto) {
        // TODO: implement
        return null;
    }

    public QuizDto updateQuiz(QuizDto dto) {
        // TODO: implement
        return null;
    }

    public void deleteQuiz(UUID id) {
        // TODO: implement
    }

}
