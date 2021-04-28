package com.group5.gearmit.service;

import com.group5.gearmit.dao.UserDAO;
import com.group5.gearmit.dao.VerificationTokenDAO;
import com.group5.gearmit.model.Users;
import com.group5.gearmit.model.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
public class UserServiceI implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private VerificationTokenDAO tokenDAO;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    @Transactional
    public boolean checkName(String name) {
        Users user = userDAO.getUsersByName(name);
        return user != null;
    }

    @Override
    @Transactional
    public boolean checkEmail(String email) {
        Users user = userDAO.getUsersByEmail(email);
        return user != null;
    }

    private void verifyEmail(Users user) {
        VerificationToken token = new VerificationToken();
        String tokenGenerated = UUID.randomUUID().toString();
        token.setToken(tokenGenerated);
        token.setUser(user);
        tokenDAO.saveAndFlush(token);

        String recipientAddress = user.getEmail();
        String subject = "Registration Confirmation";
        String confirmationUrl = "/regitrationConfirmed/" + tokenGenerated;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom("no-reply@geaRMIT.com");
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText("Go to the link to verify email. It will expire in 24 horus" + "\r\n" + "http://localhost:8080" + confirmationUrl);
        mailSender.send(email);
    }

    @Override
    @Transactional
    public String loginUser(Map<String, String> user) {
        String storedPassword = userDAO.getUsersPasswordByName(user.get("name"));
        if (storedPassword == null) {
            return "name";
        }
        if (!passwordEncoder.matches(user.get("password"), storedPassword)) {
            return "password";
        }
        return "success";
    }

    @Override
    @Transactional
    public Map<String, String> addUser(Map<String, String> userInfo) {
        Map<String, String> response = new HashMap<String, String>();
        boolean nameExisted = checkName(userInfo.get("name"));
        boolean emailExisted = checkEmail(userInfo.get("email"));
        if (nameExisted) {
            response.put("name", "existed");
        } else {
            response.put("name", "available");
        }

        if (emailExisted) {
            response.put("email", "existed");
        } else {
            response.put("email", "available");
        }

        if (!emailExisted && !nameExisted) {
            Users user = new Users();
            user.setName(userInfo.get("name"));
            user.setEmail(userInfo.get("email"));
            user.setPassword(passwordEncoder.encode(userInfo.get("password")));
            user.setPhone(userInfo.get("phone"));
            userDAO.saveAndFlush(user);
            response.put("status", "success");
            verifyEmail(user);
            return response;
        }
        response.put("status", "failed");
        return response;
    }
}
