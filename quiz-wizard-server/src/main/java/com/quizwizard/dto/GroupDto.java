package com.quizwizard.dto;

import com.quizwizard.dao.GroupDao;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class GroupDto {

    private UUID id;

    private String name;

    private String description;

    private Set<StudentDto> students;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<StudentDto> getStudents() {
        return students;
    }

    public void setStudents(Set<StudentDto> students) {
        this.students = students;
    }

    public static GroupDto daoToDto(GroupDao dao) {
        GroupDto dto = new GroupDto();
        dto.setId(dao.getId());
        dto.setName(dao.getName());
        dto.setDescription(dao.getDescription());
        dto.setStudents(dao.getStudents().stream().map(StudentDto::daoToDto).collect(Collectors.toSet()));
        return dto;
    }

    public static GroupDao dtoToDao(GroupDto dto) {
        GroupDao dao = new GroupDao();
        dao.setId(dto.getId());
        dao.setName(dto.getName());
        dao.setDescription(dto.getDescription());
        dao.setStudents(dto.getStudents().stream().map(StudentDto::dtoToDao).collect(Collectors.toSet()));
        return dao;
    }

}
