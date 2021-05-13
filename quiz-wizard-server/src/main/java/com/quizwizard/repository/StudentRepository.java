package com.quizwizard.repository;

import com.quizwizard.dao.StudentDao;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface StudentRepository extends CrudRepository<StudentDao, UUID> {

}
