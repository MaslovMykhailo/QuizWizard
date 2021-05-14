package com.quizwizard.service;

import com.quizwizard.dto.AnalyticDto;
import com.quizwizard.repository.AnswerRepository;
import com.quizwizard.repository.GroupRepository;
import com.quizwizard.repository.QuizRepository;
import com.quizwizard.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
public class AnalyticService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    public Map<UUID, AnalyticDto.AnalyticByGroupDto> getAnalyticByGroups() {
        // TODO: Implement
        return null;
    }

    public Map<UUID, AnalyticDto.AnalyticByQuizDto> getAnalyticByQuizzes() {
        // TODO: Implement
        return null;
    }

}
