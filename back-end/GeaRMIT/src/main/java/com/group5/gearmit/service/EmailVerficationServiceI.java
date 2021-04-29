package com.group5.gearmit.service;

import com.group5.gearmit.dao.UserDAO;
import com.group5.gearmit.dao.VerificationTokenDAO;
import com.group5.gearmit.model.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class EmailVerficationServiceI implements EmailVerificationService{
    @Autowired
    UserDAO userDAO;

    @Autowired
    VerificationTokenDAO tokenDAO;

    private String verifyEmail(String token) {
        VerificationToken user = tokenDAO.getTokenByToken(token);
        if (user == null) {
            return "Token have expired or not existed";
        }
        Calendar cal = Calendar.getInstance();
        if ((user.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
            return "Token Expired";
        }
        userDAO.setUserInfoById(true, user.getUser().getId());
        return "Successfully activate account";
    }

    @Override
    public Map<String, String> response(String token) {
        Map<String, String> message = new HashMap<>();
        message.put("status", verifyEmail(token));
        return message;
    }
}
