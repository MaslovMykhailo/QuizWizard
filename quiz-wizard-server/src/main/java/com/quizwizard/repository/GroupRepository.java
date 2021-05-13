package com.quizwizard.repository;

import com.quizwizard.dao.GroupDao;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface GroupRepository extends CrudRepository<GroupDao, UUID> {

}
