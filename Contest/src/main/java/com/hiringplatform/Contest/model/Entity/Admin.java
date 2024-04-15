package com.hiringplatform.Contest.model.Entity;

import com.hiringplatform.Contest.model.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;

@Entity @Data @Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Admin {
    @Id
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public void setRole(String role) {
        this.role = Role.GUEST;
    }
}
