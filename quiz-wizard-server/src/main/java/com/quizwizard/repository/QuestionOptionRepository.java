package com.quizwizard.repository;

import com.quizwizard.dao.QuestionOptionDao;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface QuestionOptionRepository extends CrudRepository<QuestionOptionDao, UUID> {

}
