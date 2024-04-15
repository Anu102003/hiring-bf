package com.hiringplatform.Contest.model.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hiringplatform.Contest.model.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity @Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Guest {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int userId;
    private String name;
    private String password;
    private String email;
    private String Stack;
    private String mcqQues;
    private String mcqMarks;
    private String codeQues;
    private String codeMarks;
    private int totalMarks;
    private String userFeedback;
    private String adminFeedback;
    @ManyToOne
    @JoinColumn(name = "Contest_id")
    @JsonBackReference("contest")
    private Contest contest;
    @ManyToOne
    @JoinColumn(name = "Employee_id")
    @JsonBackReference("employee")
    private Employee employee;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void setRole(Role role) {
        this.role = Role.GUEST;
    }
}
