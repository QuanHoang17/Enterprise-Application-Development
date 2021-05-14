package com.group5.gearmit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class GeaRmitApplication {

    public static void main(String[] args) {
        SpringApplication.run(GeaRmitApplication.class, args);
    }

}
