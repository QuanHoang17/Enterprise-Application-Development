package com.group5.gearmit.dao;

import com.group5.gearmit.model.Users;
import com.group5.gearmit.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenDAO extends JpaRepository<VerificationToken, Integer> {
    @Query(value = "select t from VerificationToken t where t.token = :token")
    VerificationToken getTokenByToken(@Param("token") String token);
}
