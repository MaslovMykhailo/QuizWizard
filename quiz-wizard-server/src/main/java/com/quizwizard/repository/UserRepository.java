package com.quizwizard.repository;

import com.quizwizard.model.UserDao;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserDao, Integer> {

    UserDao findByUsername(String username);

}
