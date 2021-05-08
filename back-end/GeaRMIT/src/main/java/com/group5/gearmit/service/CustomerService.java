package com.group5.gearmit.service;

import com.group5.gearmit.entity.Customer;

import java.util.List;
import java.util.Map;

public interface CustomerService {

    boolean checkName(String name);

    boolean checkEmail(String name);

    Map<String, String> loginUser(Map<String, String> customerInfo);

    Map<String, String> addCustomer(Map<String, String> customerInfo);

    Map<String, String> deleteCustomer(String customerName);

    List<Customer> getAllCustomer();
}
