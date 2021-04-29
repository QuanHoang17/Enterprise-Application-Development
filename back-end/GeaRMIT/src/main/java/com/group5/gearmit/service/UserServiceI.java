package com.group5.gearmit.service;

import com.group5.gearmit.dao.UserDAO;
import com.group5.gearmit.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class UserServiceI implements UserService {
    @Autowired
    private UserDAO userDAO;

    @Autowired
    private AuthenticationService authenticationService;

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

    @Override
    @Transactional
    public Map<String, String> loginUser(Map<String, String> user) {
        Map<String, String> response = new HashMap<>();
        Users storedUser = userDAO.getUsersByName(user.get("name"));
        if (storedUser == null) {
            response.put("message", "name");
            return response;
        }
        if (!authenticationService.verifyPassword(user.get("password"), storedUser.getPassword())) {
            response.put("message", "password");
            return response;
        }
        if (!storedUser.isEnabled()) {
            response.put("message", "email");
            return response;
        }
        response.put("message", "success");
        return response;
    }

    @Override
    @Transactional
    public Map<String, String> addUser(Map<String, String> userInfo) {
        Map<String, String> response = new HashMap<>();
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
            user.setPassword(authenticationService.encodePassword(userInfo.get("password")));
            user.setPhone(userInfo.get("phone"));
            userDAO.saveAndFlush(user);
            response.put("status", "success");
            authenticationService.sendVerifyEmail(user);
            return response;
        }
        response.put("status", "failed");
        return response;
    }
}
