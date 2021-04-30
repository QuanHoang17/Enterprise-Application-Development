package com.group5.gearmit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceI implements EmailSerivce {
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String senderAddress, String recipientAddress, String subject, String text) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom(senderAddress);
        email.setTo(recipientAddress);
        email.setSubject(subject);
        email.setText(text);
        mailSender.send(email);
    }
}
