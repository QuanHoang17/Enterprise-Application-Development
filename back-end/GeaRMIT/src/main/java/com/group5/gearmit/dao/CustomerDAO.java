package com.group5.gearmit.dao;

import com.group5.gearmit.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDAO extends JpaRepository<Customer, String> {
    @Query(value = "SELECT c FROM Customer c WHERE c.email = :email")
    Customer getUsersByEmail(@Param("email") String email);

    @Query(value = "SELECT c FROM Customer c WHERE c.name = :name")
    Customer getUsersByName(@Param("name") String name);

    @Modifying
    @Query("UPDATE Customer c SET c.enabled = :isEnabled WHERE c.id = :id")
    void setUserInfoById(@Param("isEnabled") boolean isEnabled, @Param("id") String id);

    @Modifying
    @Query("DELETE FROM Customer c WHERE c.name = :name")
    void deleteCustomerByName(@Param("name") String name);
}