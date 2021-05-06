package com.group5.gearmit.service;

import com.group5.gearmit.dao.CustomerDAO;
import com.group5.gearmit.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CustomerServiceI implements CustomerService {
    @Autowired
    private CustomerDAO customerDAO;

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    @Transactional
    public boolean checkName(String name) {
        Customer user = customerDAO.getUsersByName(name);
        return user != null;
    }

    @Override
    @Transactional
    public boolean checkEmail(String email) {
        Customer user = customerDAO.getUsersByEmail(email);
        return user != null;
    }

    @Override
    @Transactional
    public Map<String, String> loginUser(Map<String, String> customerInfo) {
        Map<String, String> response = new HashMap<>();
        Customer storedUser = customerDAO.getUsersByName(customerInfo.get("name"));
        if (storedUser == null) {
            response.put("message", "name");
            return response;
        }
        if (!authenticationService.verifyPassword(customerInfo.get("password"), storedUser.getPassword())) {
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

    // CRUD for Customer
    @Override
    @Transactional
    public Map<String, String> addCustomer(Map<String, String> customerInfo) {
        Map<String, String> response = new HashMap<>();
        boolean nameExisted = checkName(customerInfo.get("name"));
        boolean emailExisted = checkEmail(customerInfo.get("email"));
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
            Customer user = new Customer();
            user.setName(customerInfo.get("name"));
            user.setEmail(customerInfo.get("email"));
            user.setPassword(authenticationService.encodePassword(customerInfo.get("password")));
            user.setPhone(customerInfo.get("phone"));
            customerDAO.save(user);
            response.put("status", "success");
            authenticationService.sendVerifyEmail(user);
            return response;
        }
        response.put("status", "failed");
        return response;
    }

    @Override
    @Transactional
    public Map<String, String> deleteCustomer(String customerName) {
        Map<String, String> response = new HashMap<>();
        authenticationService.deleteVerificationToken(customerName);
        customerDAO.deleteCustomerByName(customerName);
        response.put("status", "success");
        return response;
    }

    @Override
    public List<Customer> getAllCustomer() {
        return customerDAO.findAll();
    }
}
