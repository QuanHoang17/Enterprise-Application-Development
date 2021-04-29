package com.group5.gearmit.dao;

import com.group5.gearmit.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO extends JpaRepository<Users, Integer> {
    @Query(value = "select u from Users u where u.email = :email")
    Users getUsersByEmail(@Param("email") String email);

    @Modifying
    @Query("update Users u set u.enabled = :isEnabled where u.id = :id")
    void setUserInfoById(@Param("isEnabled") boolean isEnabled, @Param("id") Integer id);

    @Query(value = "select u from Users u where u.name = :name")
    Users getUsersByName(@Param("name") String name);

    @Query(value = "select u.password from Users u where u.name = :name")
    String getUsersPasswordByName(@Param("name") String name);
}