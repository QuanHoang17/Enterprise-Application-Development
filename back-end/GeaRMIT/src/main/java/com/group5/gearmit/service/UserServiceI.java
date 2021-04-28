package com.group5.gearmit.service;

import com.group5.gearmit.dao.UserDAO;
import com.group5.gearmit.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class UserServiceI implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDAO userDAO;

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
            return response;
        }
        response.put("status", "failed");
        return response;
    }
}
