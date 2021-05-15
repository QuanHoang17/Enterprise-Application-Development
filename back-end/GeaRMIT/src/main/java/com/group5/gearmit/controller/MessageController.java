package com.group5.gearmit.controller;

import com.group5.gearmit.service.EmailSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class MessageController {

    @Autowired
    private EmailSerivce emailSerivce;

    @PostMapping(value = "/api/message")
    public Map<String, String> receiveMessage(@RequestBody Map<String, String> messageInfo) {
        Map<String, String> response = new HashMap<>();
        String senderAddress = "gearmitowner@gmail.com";
        String recipientAddress = "gearmitowner@gmail.com";
        String subject = "Customer message from " + messageInfo.get("name") + ", " + messageInfo.get("email");
        String text = "Name: " + messageInfo.get("name") + "\nEmail: " + messageInfo.get("email") + "\n" + messageInfo.get("message");
        emailSerivce.sendEmail(senderAddress, recipientAddress, subject, text);
        response.put("status", "success");
        return response;
    }
}
