package com.group5.gearmit.service;

public interface EmailSerivce {
    void sendEmail(String senderAddress, String recipientAddress, String subject, String text);
}
