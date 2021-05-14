package com.quizwizard.controller;

import com.quizwizard.dto.GroupDto;
import com.quizwizard.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping(path = "/", produces = "application/json")
    @ResponseBody
    public List<GroupDto> getStudents() {
        return groupService.getGroups();
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    @ResponseBody
    public GroupDto getStudent(@PathVariable UUID id) {
        return groupService.getGroup(id);
    }

    @PostMapping(path = "/", produces = "application/json")
    @ResponseBody
    public GroupDto createStudent(@RequestBody GroupDto dto) {
        return groupService.createGroup(dto);
    }

    @PutMapping(path = "/", produces = "application/json")
    @ResponseBody
    public GroupDto updateStudent(@RequestBody GroupDto dto) {
        return groupService.updateGroup(dto);
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteStudent(@PathVariable UUID id) {
        groupService.deleteGroup(id);
    }

}

