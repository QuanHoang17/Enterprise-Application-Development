package com.group5.gearmit.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table (name = "users")
public class Users {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "customer_generator")
    @GenericGenerator(name="customer_generator", strategy = "native")
    private Integer id;

    @Column
    private String name;

    @Column
    private String password;

    @Column
    private String phone;

    @Column
    private String email;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Users customer = (Users) o;
        return id.equals(customer.id) &&
                name.equals(customer.name) &&
                password.equals(customer.password) &&
                phone.equals(customer.phone) &&
                email.equals(customer.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, password, phone, email);
    }

//    Users(String name, String password, String phone, String email) {
//        this.name = name;
//        this.password = password;
//        this.phone = phone;
//        this.email = email;
//    }
}
