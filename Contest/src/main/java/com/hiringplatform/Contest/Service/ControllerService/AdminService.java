package com.hiringplatform.Contest.Service.ControllerService;

import com.hiringplatform.Contest.Service.CustomService.AdminServices;
import com.hiringplatform.Contest.model.*;
import com.hiringplatform.Contest.model.DTO.MailDTO;
import com.hiringplatform.Contest.model.DTO.ResponseDTO;
import com.hiringplatform.Contest.model.Entity.*;
import com.hiringplatform.Contest.repos.*;
import jakarta.transaction.Transactional;
import net.minidev.json.JSONObject;
import net.minidev.json.JSONValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.mail.MailSender;

import javax.tools.*;
import java.io.*;
import java.nio.file.Files;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    Employeerepo employeerepo;
    @Autowired
    Contestrepo contestrepo;
    @Autowired
    Guestrepo guestrepo;
    @Autowired
    Partrepo partrepo;
    @Autowired
    Weightagerepo weightagerepo;

    @Autowired
    AdminServices adminServices;

    PasswordEncoder passwordEncoder;

    public AdminService(@Lazy PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }



    public ResponseEntity<ResponseDTO> addEmpService(Employee employee){
        employee.setRole(Role.EMPLOYEE);
        employeerepo.save(employee);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The employee added successfully", employee));
    }
    public ResponseEntity<ResponseDTO> addContestService(Contest contest){
        contestrepo.save(contest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The contestant added successfully", contest.getCid()));
    }

    public ResponseEntity<ResponseDTO> getLiveContestService(){
        Timestamp current = new Timestamp(System.currentTimeMillis());
        System.out.println(current);
        System.out.println(contestrepo.findByEndTimeAfter(current));
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The live contest", contestrepo.findByEndTimeAfter(current)));
    }

    public ResponseEntity<ResponseDTO> getContestService(){
        Timestamp current = new Timestamp(System.currentTimeMillis());
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Contest Info" , contestrepo.findByEndTimeBefore(current)));
    }
    public ResponseEntity<ResponseDTO> addUserService(int Cid, Guest guest){
        guest.setTotalMarks(-1);
        guest.setEmail(guest.getEmail());
        guest.setContest(contestrepo.findById(Cid).get());
        guest.setPassword(passwordEncoder.encode(guest.getPassword()));
        guest.setRole(guest.getRole());
        guestrepo.save(guest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "User added" , guest));
    }

    @Transactional
    public ResponseEntity<ResponseDTO> addPartService(int Cid, JSONObject file) throws IOException {
        JSONObject jsonObject = file;
        Part part = new Part();
        part.setName((String) jsonObject.get("Category"));
        Weightage weightage = new Weightage();
        Integer easy = Integer.parseInt((String) jsonObject.get("Easy"));
        Integer medium = Integer.parseInt((String) jsonObject.get("Medium"));
        Integer hard = Integer.parseInt((String) jsonObject.get("Hard"));
        weightage.setEasy(easy);
        weightage.setHard(hard);
        weightage.setMedium(medium);
        int totalScore = easy + medium + hard;
        System.out.println(totalScore);

        // Save the Weightage entity first
        weightagerepo.save(weightage);

        // Save the Part entity
        part.setWeight(weightage);
        partrepo.save(part);

        Contest contest = contestrepo.findById(Cid).get();
        if (jsonObject.getAsString("Category").equals("programming")) {
            contest.setTotalScore((totalScore * 10) + contest.getTotalScore());
            String score = contest.getScoreRules();
            if (score == null)
                score = "";
            score = score + "Coding: " + score + " marks";
            contest.setScoreRules(score);
        } else {
            contest.setTotalScore(totalScore + contest.getTotalScore());
            String score = contest.getScoreRules();
            if (score == null)
                score = "";
            if (jsonObject.getAsString("Category").equals("coding"))
                score = score + "Programming: " + totalScore + " marks";
            else
                score = score + jsonObject.getAsString("Category") + totalScore + " marks";
            contest.setScoreRules(score);
        }
        System.out.println("Programming");
        part.setContest1(contest);
        List<Part> partList = contest.getPart1();
        partList.add(part);
        contest.setPart1(partList);
        System.out.println("Before saving");
        contestrepo.save(contest);
        System.out.println("After saving");

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Part added", null));
    }



    public ResponseEntity<ResponseDTO> getEmployeeService(){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Employee details" , employeerepo.getEmployee()));
    }

    public ResponseEntity<ResponseDTO> addAdmin(Employee employee) {
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        employee.setRole(Role.ADMIN);
        employeerepo.save(employee);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Employee added" , employee));
    }

    public ResponseEntity<ResponseDTO> sendEmail(MailDTO mailStructure, int cid, int mark) {
        return adminServices.sendMails(mailStructure, cid, mark);
    }

    public ResponseEntity<ResponseDTO> getParts(Contest contestId) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "MCQ Parts " , partrepo.getParts(contestId)));
    }

    public ResponseEntity<ResponseDTO> getCodingParts(Contest contest) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Coding Parts " , partrepo.getCodingParts(contest)));
    }

    public ResponseEntity<ResponseDTO> getUserById(int id) {
        Contest contest = contestrepo.findById(id).get();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Users " , guestrepo.getUserByContest(contest)));
    }

    public ResponseEntity<ResponseDTO> getContest(int id) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Users " , contestrepo.findById(id)));

    }

    public ResponseEntity<ResponseDTO> viewParticipantService(int ContestId,int percentage){
        Contest contest=contestrepo.findById(ContestId).get();
        contest.setPassPercentage(percentage);
        contestrepo.save(contest);
        int mark=contest.getTotalScore();
        int passmark = (percentage*mark)/100;
        int nonparticipants = guestrepo.findByFail(contestrepo.findById(ContestId).get(),-1).size();
        int pass = guestrepo.findByPassMarks(contestrepo.findById(ContestId).get(),passmark).size();
        int participants = guestrepo.findByContestOrderByTotalMarksDesc(contestrepo.findById(ContestId).get()).size()-nonparticipants;
        int fail = participants-pass;
        Map<String, Integer> map = new HashMap<>();
        map.put("participants",participants);
        map.put("Na",nonparticipants);
        map.put("pass", pass);
        map.put("fail", fail);
        JSONObject jsonObject = new JSONObject(map);
        System.out.println(map);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Users " , jsonObject));
    }


}
