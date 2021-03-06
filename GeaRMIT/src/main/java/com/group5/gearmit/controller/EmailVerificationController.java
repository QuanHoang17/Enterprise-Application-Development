package com.group5.gearmit.controller;

import com.group5.gearmit.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
public class EmailVerificationController {

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/api/regitrationConfirmed/{token}")
    public Map<String, String> verifyEmail(@PathVariable("token") String token) {
        return authenticationService.verifyEmailToken(token);
    }
}
