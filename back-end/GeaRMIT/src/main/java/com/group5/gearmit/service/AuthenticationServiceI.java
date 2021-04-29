package com.group5.gearmit.service;

import com.group5.gearmit.dao.UserDAO;
import com.group5.gearmit.dao.VerificationTokenDAO;
import com.group5.gearmit.model.Users;
import com.group5.gearmit.model.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
public class AuthenticationServiceI implements AuthenticationService {
    @Autowired
    private UserDAO userDAO;

    @Autowired
    private VerificationTokenDAO tokenDAO;

    @Autowired
    private EmailSerivce emailSerivce;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> verifyEmailToken(String token) {
        Map<String, String> response = new HashMap<>();
        VerificationToken user = tokenDAO.getTokenByToken(token);
        if (user == null) {
            response.put("status", "Token have expired or not existed");
            return response;
        }
        Calendar cal = Calendar.getInstance();
        if ((user.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            response.put("status", "Token have expired");
            return response;
        }
        userDAO.setUserInfoById(true, user.getUser().getId());
        response.put("status", "Successfully activate account");
        return response;
    }

    @Override
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Override
    public Boolean verifyPassword(String password, String storedPassword) {
        return passwordEncoder.matches(password, storedPassword);
    }

    @Override
    @Transactional
    public void sendVerifyEmail(Users user) {
        // Create new token and add the token to the database
        VerificationToken token = new VerificationToken();
        String tokenGenerated = UUID.randomUUID().toString();
        token.setToken(tokenGenerated);
        token.setUser(user);
        tokenDAO.saveAndFlush(token);

        // Create email content
        String confirmationUrl = "http://localhost:8080/api/regitrationConfirmed/" + tokenGenerated;
        String recipientAddress = user.getEmail();
        String subject = "Email Registration Confirmation";
        String senderAddress = "no-reply@geaRMIT.com";
        String emailText = "Visit the link below to activate your account \r\n" + confirmationUrl;

        emailSerivce.sendEmail(senderAddress, recipientAddress, subject, emailText);
    }
}
