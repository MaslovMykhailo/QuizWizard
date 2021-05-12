package com.quizwizard.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin()
public class GreetingController {

    @RequestMapping(value = "/greeting", method = RequestMethod.GET)
    public ResponseEntity<String> getEmployees() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (!auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = auth.getPrincipal() instanceof UserDetails ?
            ((UserDetails) auth.getPrincipal()).getUsername() :
            auth.getPrincipal().toString();

        return ResponseEntity.ok("Welcome " + username + "!") ;
    }

}
