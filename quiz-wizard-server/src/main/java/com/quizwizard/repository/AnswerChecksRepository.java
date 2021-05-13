package com.quizwizard.repository;

import com.quizwizard.dao.AnswerCheckDao;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface AnswerChecksRepository extends CrudRepository<AnswerCheckDao, UUID> {

}
