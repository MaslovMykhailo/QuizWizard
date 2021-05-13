package com.quizwizard.controller;

import com.quizwizard.dto.StudentDto;
import com.quizwizard.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping(path = "/", produces = "application/json")
    @ResponseBody
    public List<StudentDto> getStudents() {
        return studentService.getStudents();
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    @ResponseBody
    public StudentDto getStudent(@PathVariable UUID id) {
        return studentService.getStudent(id);
    }

    @PostMapping(path = "/", produces = "application/json")
    @ResponseBody
    public StudentDto createStudent(@RequestBody StudentDto dto) {
        return studentService.createStudent(dto);
    }

    @GetMapping(path = "/", produces = "application/json")
    @ResponseBody
    public StudentDto updateStudent(@RequestBody StudentDto dto) {
        return studentService.updateStudent(dto);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteStudent(@PathVariable UUID id) {
        studentService.deleteStudent(id);
    }

}
