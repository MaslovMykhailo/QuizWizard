package com.quizwizard.service;

import com.quizwizard.dto.GroupDto;
import com.quizwizard.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    public List<GroupDto> getGroups() {
        return userDetailsService
            .getAuthenticatedUser()
            .getGroups()
            .stream()
            .map(GroupDto::daoToDto)
            .collect(Collectors.toList());
    }

    public GroupDto getGroup(UUID id) {
        return groupRepository
            .findById(id)
            .map(GroupDto::daoToDto)
            .orElse(null);
    }

    public GroupDto createGroup(GroupDto dto) {
        return GroupDto.daoToDto(groupRepository.save(GroupDto.dtoToDao(dto)));
    }

    public GroupDto updateGroup(GroupDto dto) {
        return GroupDto.daoToDto(groupRepository.save(GroupDto.dtoToDao(dto)));
    }

    public void deleteGroup(UUID id) {
        groupRepository.deleteById(id);
    }

}
