package com.hiringplatform.Contest.repos;

import com.hiringplatform.Contest.model.Entity.Weightage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Weightagerepo extends JpaRepository<Weightage,Integer> {
}
