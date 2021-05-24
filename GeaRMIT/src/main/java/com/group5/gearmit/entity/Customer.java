package com.group5.gearmit.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table (name = "customer")
public class Customer {
    @Id
    @Column
    @GeneratedValue(generator = "customer_generator")
    @GenericGenerator(
        parameters = @Parameter(name = "prefix", value = "c"),
        name = "customer_generator",
        strategy = "com.group5.gearmit.generator.PrefixIDGenerator")
    private String id;

    @Column
    private String name;

    @Column
    private String password;

    @Column
    private String phone;

    @Column
    private String email;

    @Column
    private boolean enabled = false;

    @Column
    private String privilege = "user";

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return enabled == customer.enabled &&
                Objects.equals(id, customer.id) &&
                Objects.equals(name, customer.name) &&
                Objects.equals(password, customer.password) &&
                Objects.equals(phone, customer.phone) &&
                Objects.equals(email, customer.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, password, phone, email, enabled);
    }
}
