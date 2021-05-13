package com.quizwizard.repository;

import com.quizwizard.dao.QuizDao;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface QuizRepository extends CrudRepository<QuizDao, UUID> {

}
