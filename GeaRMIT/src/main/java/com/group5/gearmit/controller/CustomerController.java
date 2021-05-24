package com.group5.gearmit.controller;

import com.group5.gearmit.entity.Customer;
import com.group5.gearmit.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping(value = "/api/customer")
    public Map<String, String> addCustomer(@RequestBody Map<String, String> customer) {
        return customerService.addCustomer(customer);
    }

    @DeleteMapping(value = "/api/customer/{name}")
    public Map<String, String> deleteCustomer(@PathVariable("name") String name) {
        return customerService.deleteCustomer(name);
    }

    @GetMapping(value = "/api/customer")
    public List<Customer> getAllCustomer() {
        return customerService.getAllCustomer();
    }

    @PostMapping(value = "/api/login")
    public Map<String, String> loginUsers(@RequestBody Map<String, String> customer) {
        return customerService.loginUser(customer);
    }
}