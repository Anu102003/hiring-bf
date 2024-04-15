package com.hiringplatform.Contest.repos;

import com.hiringplatform.Contest.model.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Employeerepo extends JpaRepository<Employee,Integer> {
    Employee findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT e FROM Employee e WHERE e.role != 'ADMIN'")
    List<Employee> getEmployee();
}
