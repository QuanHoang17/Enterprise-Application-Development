package com.group5.gearmit.controller;

import com.group5.gearmit.service.EmailVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class EmailVerificationController {
    @Autowired
    EmailVerificationService emailService;

    @GetMapping("/regitrationConfirmed/{token}")
    public Map<String, String> verifyEmail(@PathVariable("token") String token) {
        return emailService.response(token);
    }
}
