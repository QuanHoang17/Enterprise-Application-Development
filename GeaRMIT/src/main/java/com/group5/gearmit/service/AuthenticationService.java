package com.group5.gearmit.service;

import com.group5.gearmit.entity.Customer;

import java.util.Map;

public interface AuthenticationService {

    Map<String, String> verifyEmailToken(String token);

    String encodePassword(String password);

    Boolean verifyPassword(String password, String storedPassword);

    void sendVerifyEmail(Customer user);

    void deleteVerificationToken(String customerName);
}
