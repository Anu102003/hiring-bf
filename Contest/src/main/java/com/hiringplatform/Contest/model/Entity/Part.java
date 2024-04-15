package com.hiringplatform.Contest.model.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Part {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int Pid;

    @ManyToOne
    @JoinColumn(name = "contest1")
    @JsonBackReference
    private Contest contest1;

    private String name;

    @OneToOne
    @JoinColumn(name = "w_id")
    private Weightage weight;
}
