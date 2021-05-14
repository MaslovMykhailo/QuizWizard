package com.quizwizard.controller;

import com.quizwizard.dto.AnswerDto;
import com.quizwizard.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @GetMapping(path = "/", produces = "application/json")
    @ResponseBody
    public List<AnswerDto> getAnswers() {
        return answerService.getAnswers();
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    @ResponseBody
    public AnswerDto getAnswer(@PathVariable UUID id) {
        return answerService.getAnswer(id);
    }

    @PostMapping(path = "/", produces = "application/json")
    @ResponseBody
    public AnswerDto createAnswer(@RequestBody AnswerDto dto) {
        return answerService.createAnswer(dto);
    }

    @PutMapping(path = "/", produces = "application/json")
    @ResponseBody
    public AnswerDto updateAnswer(@RequestBody AnswerDto dto) {
        return answerService.updateAnswer(dto);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteStudent(@PathVariable UUID id) {
        answerService.deleteAnswer(id);
    }

}
