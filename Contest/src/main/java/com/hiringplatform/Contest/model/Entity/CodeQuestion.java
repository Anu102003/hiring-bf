package com.hiringplatform.Contest.model.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity @Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CodeQuestion {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private String Qid;
    private String question;
    private String input;
    private  String output;
    private String weightage;
//    private String part;
//    @ManyToOne @JoinColumn(name = "Pid")
//    private Part part7;
//    @ManyToMany
//    @JoinTable(name = "code_weight",
//    joinColumns = @JoinColumn(name = "code"),
//    inverseJoinColumns = @JoinColumn(name = "weight"))
//    private List<Weightage> weightage;
}
