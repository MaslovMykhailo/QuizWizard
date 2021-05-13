package com.quizwizard.repository;

import com.quizwizard.dao.PreferencesDao;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface PreferencesRepository extends CrudRepository<PreferencesDao, UUID> {

}
