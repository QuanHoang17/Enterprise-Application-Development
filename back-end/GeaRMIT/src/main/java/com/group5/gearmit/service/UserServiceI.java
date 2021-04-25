package com.group5.gearmit.service;

import com.group5.gearmit.dao.UserDAO;
import com.group5.gearmit.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserServiceI implements UserService {
    @Autowired
    private UserDAO userDAO;

    @Override
    public boolean checkName(String name) {
        Users user = userDAO.getUsersByName(name);
        return user != null;
    }

    @Override
    public boolean checkEmail(String email) {
        Users user = userDAO.getUsersByEmail(email);
        return user != null;
    }

    @Override
    public String addUser(Map<String, String> userInfo) {
        Users user = new Users();
        user.setName(userInfo.get("name"));
        user.setEmail(userInfo.get("email"));
        user.setPassword(userInfo.get("password"));
        user.setPhone(userInfo.get("phone"));
        Object response = userDAO.saveAndFlush(user);
        System.out.println(response);
        return "success";
    }


}
