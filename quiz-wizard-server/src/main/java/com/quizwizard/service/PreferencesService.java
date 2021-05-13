package com.quizwizard.service;

import com.quizwizard.dao.PreferencesDao;
import com.quizwizard.dto.PreferencesDto;
import com.quizwizard.repository.PreferencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PreferencesService {

    @Autowired
    private PreferencesRepository preferencesRepository;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    public PreferencesDto getPreferences() {
        return daoToDto(userDetailsService.getAuthenticatedUser().getPreferences());
    }

    public PreferencesDto updatePreferences(PreferencesDto dto) {
        PreferencesDao dao = userDetailsService.getAuthenticatedUser().getPreferences();
        dao.setTheme(dto.getTheme());
        dao.setLanguage(dto.getLanguage());
        preferencesRepository.save(dao);
        return daoToDto(dao);
    }

    public static PreferencesDto daoToDto(PreferencesDao dao) {
        PreferencesDto dto = new PreferencesDto();
        dto.setTheme(dao.getTheme());
        dto.setLanguage(dao.getLanguage());
        return dto;
    }

    public static PreferencesDao dtoToDao(PreferencesDto dto) {
        PreferencesDao dao = new PreferencesDao();
        dao.setTheme(dto.getTheme());
        dao.setLanguage(dto.getLanguage());
        return dao;
    }

}
