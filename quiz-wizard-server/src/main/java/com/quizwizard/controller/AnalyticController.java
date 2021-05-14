package com.quizwizard.controller;

import com.quizwizard.dto.AnalyticDto;
import com.quizwizard.service.AnalyticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("analytics")
public class AnalyticController {

    @Autowired
    private AnalyticService analyticService;

    @GetMapping(path = "/groups", produces = "application/json")
    @ResponseBody
    public Map<UUID, AnalyticDto.AnalyticByGroupDto> getAnalyticByGroups() {
        return analyticService.getAnalyticByGroups();
    }

    @GetMapping(path = "/quizzes", produces = "application/json")
    @ResponseBody
    public Map<UUID, AnalyticDto.AnalyticByQuizDto> getAnalyticByQuizzes() {
        return analyticService.getAnalyticByQuizzes();
    }

}
