package com.quizwizard.service;

import com.quizwizard.dto.AnswerDto;
import com.quizwizard.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    public List<AnswerDto> getAnswers() {
        // TODO: implement
        return null;
    }

    public AnswerDto getAnswer(UUID id) {
        // TODO: implement
        return null;
    }

    public AnswerDto createAnswer(AnswerDto dto) {
        // TODO: implement
        return null;
    }

    public AnswerDto updateAnswer(AnswerDto dto) {
        // TODO: implement
        return null;
    }

    public void deleteAnswer(UUID id) {
        // TODO: implement
    }

}
