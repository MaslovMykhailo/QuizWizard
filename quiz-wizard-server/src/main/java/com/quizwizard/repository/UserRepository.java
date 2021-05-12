package com.quizwizard.repository;

import com.quizwizard.dao.UserDao;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface UserRepository extends CrudRepository<UserDao, UUID> {

    UserDao findByUsername(String username);

}
