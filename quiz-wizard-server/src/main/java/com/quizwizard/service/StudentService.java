package com.quizwizard.service;

import com.quizwizard.dto.StudentDto;
import com.quizwizard.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    public List<StudentDto> getStudents() {
        return userDetailsService
            .getAuthenticatedUser()
            .getStudents()
            .stream()
            .map(StudentDto::daoToDto)
            .collect(Collectors.toList());
    }

    public StudentDto getStudent(UUID id) {
        return studentRepository
            .findById(id)
            .map(StudentDto::daoToDto)
            .orElse(null);
    }

    public StudentDto createStudent(StudentDto dto) {
        return StudentDto.daoToDto(studentRepository.save(StudentDto.dtoToDao(dto)));
    }

    public StudentDto updateStudent(StudentDto dto) {
        return StudentDto.daoToDto(studentRepository.save(StudentDto.dtoToDao(dto)));
    }

    public void deleteStudent(UUID id) {
        studentRepository.deleteById(id);
    }

}
