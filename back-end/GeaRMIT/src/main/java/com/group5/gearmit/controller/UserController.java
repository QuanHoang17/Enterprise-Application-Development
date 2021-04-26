package com.group5.gearmit.controller;

import com.group5.gearmit.model.Users;
import com.group5.gearmit.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(value = "/api/users/name/check/{name}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String checkUserID(@PathVariable("name") String name) {
        String isExistedRes = "{\"isExisted\":" + userService.checkName(name) + "}";
        return isExistedRes;
    }

    @GetMapping(value = "/api/users/email/check/{email}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String checkUserEmail(@PathVariable("email") String email) {
        String isExistedRes = "{\"isExisted\":" + userService.checkEmail(email) + "}";
        return isExistedRes;
    }

    @PostMapping(value = "/api/users")
    public Map<String, String> addUsers(@RequestBody Map<String, String> user) {
//        String isSuccess = "{\"Status\":" + userService.addUser(user) + "}";
        return userService.addUser(user);
    }

    @PostMapping(value = "/api/login", produces = {MediaType.APPLICATION_JSON_VALUE})
    public String loginUsers(@RequestBody Map<String, String> user) {
        String message = "{\"message\":\"" + userService.loginUser(user) + "\"}";
        return message;
    }
}
