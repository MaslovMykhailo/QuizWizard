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
        return PreferencesDto.daoToDto(userDetailsService.getAuthenticatedUser().getPreferences());
    }

    public PreferencesDto updatePreferences(PreferencesDto dto) {
        PreferencesDao dao = userDetailsService.getAuthenticatedUser().getPreferences();

        dao.setTheme(dto.getTheme());
        dao.setLanguage(dto.getLanguage());

        return PreferencesDto.daoToDto(preferencesRepository.save(dao));
    }

}
