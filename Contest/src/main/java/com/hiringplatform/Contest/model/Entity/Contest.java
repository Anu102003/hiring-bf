package com.hiringplatform.Contest.model.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int Cid;
    private String name;
    private Timestamp startTime;
    private Timestamp endTime;
    private String details;
    private String rules;
    private int totalScore;
    private int passPercentage;
    private String scoreRules;

    @OneToMany
    @JsonManagedReference("contest")
    private List<Guest> guest1;
    @OneToMany
    @JsonManagedReference
    private List<Part> part1;
}
