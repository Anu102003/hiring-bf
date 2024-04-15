package com.hiringplatform.Contest.model.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import java.security.Provider;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class McqQuestion {

   @Id
//   @Column(name = "qid", nullable = false)
   private String qid;
   @Column(length = 3000)
   private String question;
   @Column(length = 3000)
   private String correctOp;

   private String part;
   private String weightage;
   @Column(length = 3000)
   private String option1;
   private String option2;
   private  String option3;
   private String option4;
}
