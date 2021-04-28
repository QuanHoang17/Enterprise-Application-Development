package com.group5.gearmit.service;

import java.util.Map;

public interface EmailVerificationService {
    Map<String, String> response(String token);
}
