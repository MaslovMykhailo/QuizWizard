package com.quizwizard.dto;

import com.quizwizard.dao.PreferencesDao;

public class PreferencesDto {

    private String theme;

    private String language;

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
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
