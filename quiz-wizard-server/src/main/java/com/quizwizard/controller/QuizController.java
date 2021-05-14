package com.quizwizard.controller;

import com.quizwizard.dto.QuizDto;
import com.quizwizard.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping(path = "/", produces = "application/json")
    @ResponseBody
    public List<QuizDto> getStudents() {
        return quizService.getQuizzes();
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    @ResponseBody
    public QuizDto getStudent(@PathVariable UUID id) {
        return quizService.getQuiz(id);
    }

    @PostMapping(path = "/", produces = "application/json")
    @ResponseBody
    public QuizDto createStudent(@RequestBody QuizDto dto) {
        return quizService.createQuiz(dto);
    }

    @PutMapping(path = "/", produces = "application/json")
    @ResponseBody
    public QuizDto updateStudent(@RequestBody QuizDto dto) {
        return quizService.updateQuiz(dto);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteStudent(@PathVariable UUID id) {
        quizService.deleteQuiz(id);
    }

}
