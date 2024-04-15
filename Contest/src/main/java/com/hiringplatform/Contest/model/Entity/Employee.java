package com.hiringplatform.Contest.model.Entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hiringplatform.Contest.model.Role;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity @Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Employee {
    @Id
    private int Eid;
    private String name;
    private String password;
    private String email;
    private String expertise;
    @OneToMany(mappedBy = "employee")
    @JsonManagedReference("employee")
    private List<Guest> guest2;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void setRole(Role role) {
        this.role = role;
    }
}
