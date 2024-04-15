package com.hiringplatform.Contest.repos;

import com.hiringplatform.Contest.model.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Adminrepo extends JpaRepository<Admin,String> {
    Admin findByEmail(String username);
}
