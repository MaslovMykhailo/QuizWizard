package com.quizwizard.dto;

import com.quizwizard.dao.StudentDao;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class StudentDto {

    private UUID id;

    private String firstName;

    private String lastName;

    private Set<GroupDto> groups = new HashSet<>();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Set<GroupDto> getGroups() {
        return groups;
    }

    public void setGroups(Set<GroupDto> groups) {
        this.groups = groups;
    }

    public static StudentDto daoToDto(StudentDao dao) {
        StudentDto dto = new StudentDto();
        dto.setId(dao.getId());
        dto.setFirstName(dao.getFirstName());
        dto.setLastName(dao.getLastName());
        return dto;
    }

    public static StudentDao dtoToDao(StudentDto dto) {
        StudentDao dao = new StudentDao();
        dao.setId(dto.getId());
        dao.setFirstName(dto.getFirstName());
        dao.setLastName(dto.getLastName());
        return dao;
    }

}
