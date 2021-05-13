package com.quizwizard.repository;

import com.quizwizard.dao.AnswerDao;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface AnswerRepository extends CrudRepository<AnswerDao, UUID> {

}
