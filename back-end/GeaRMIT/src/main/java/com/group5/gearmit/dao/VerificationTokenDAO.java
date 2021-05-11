package com.group5.gearmit.dao;

import com.group5.gearmit.entity.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenDAO extends JpaRepository<VerificationToken, Long> {
    @Query(value = "SELECT t FROM VerificationToken t WHERE t.token = :token")
    VerificationToken getVerificationTokenByToken(@Param("token") String token);

    @Modifying
    @Query(value = "DELETE FROM VerificationToken t WHERE t IN (" +
            "SELECT t2 FROM VerificationToken t2 INNER JOIN t2.customer c WHERE c.name = :name)")
    void deleteVerificationTokenByCustomerName(@Param("name") String customerName);
}
