package com.quizwizard.controller;

import com.quizwizard.dto.PreferencesDto;
import com.quizwizard.service.PreferencesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@CrossOrigin
@RequestMapping("preferences")
public class PreferencesController {

    @Autowired
    private PreferencesService preferencesService;

    @GetMapping(path = "/", produces = "application/json")
    @ResponseBody
    public PreferencesDto getPreferences() {
        return preferencesService.getPreferences();
    }

    @PutMapping(path = "/", produces = "application/json")
    @ResponseBody
    public PreferencesDto updatePreferences(@RequestBody PreferencesDto dto) {
        return preferencesService.updatePreferences(dto);
    }

}
