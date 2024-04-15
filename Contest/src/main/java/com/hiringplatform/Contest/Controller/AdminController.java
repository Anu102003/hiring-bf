package com.hiringplatform.Contest.Controller;

import com.hiringplatform.Contest.Service.ControllerService.AdminService;
import com.hiringplatform.Contest.model.DTO.MailDTO;
import com.hiringplatform.Contest.model.DTO.ResponseDTO;
import com.hiringplatform.Contest.model.Entity.Contest;
import com.hiringplatform.Contest.model.Entity.Employee;
import com.hiringplatform.Contest.model.Entity.Guest;
import jakarta.transaction.Transactional;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/admin")
public class AdminController {
     @Autowired
    AdminService adminService;

     @PostMapping("/addAdmin")
     @PreAuthorize("hasAuthority('ROLE_ADMIN')")
     public ResponseEntity<ResponseDTO> addAdmin(@RequestBody Employee employee) {
         return adminService.addAdmin(employee);
     }

    @PostMapping("/addEmp")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> addEmp(@RequestBody Employee e){
        return adminService.addEmpService(e);
    }

    @PostMapping("/addContest")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> addContest(@RequestBody Contest c){
        return adminService.addContestService(c);
    }

    @GetMapping("/getContest/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getContest(@PathVariable int id) {
         return adminService.getContest(id);
    }

    @GetMapping("/getLiveContest")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getLiveContest(){
        System.out.println("getting contest");
       return adminService.getLiveContestService();
    }

    @GetMapping("/getContestLog")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getContest(){
        return adminService.getContestService();
    }

    @PostMapping("/addUser/{Cid}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> addUser(@PathVariable int Cid, @RequestBody Guest g){
        return adminService.addUserService(Cid,g);
    }

    @Transactional
    @PostMapping("/addPart/{Cid}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> addPart(@PathVariable int Cid, @RequestBody JSONObject Part ) throws IOException {
        System.out.println("Checking");
         return adminService.addPartService(Cid,Part);
    }

    @GetMapping("/getEmployee")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getEmployee(){
        return adminService.getEmployeeService();
    }

    @PostMapping("/send/{cid}/{mark}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> sendEmail(@RequestBody MailDTO mailStructure, @PathVariable("cid") int cid, @PathVariable("mark") int mark) {
         return adminService.sendEmail(mailStructure, cid, mark);
    }

    @GetMapping("/getMcqParts/{Cid}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getParts(@PathVariable("Cid") Contest contestId) {
         return adminService.getParts(contestId);
    }

    @GetMapping("getCoding/{Cid}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getCodingParts(@PathVariable("Cid") Contest contest) {
         return adminService.getCodingParts(contest);
    }

    @GetMapping("/getUser/{cid}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getUserByContest(@PathVariable int cid) {
        System.out.println(cid);
         return adminService.getUserById(cid);
    }

    @GetMapping("/pass/{cid}/{pass}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> viewParticipantService(@PathVariable("cid") int contest, @PathVariable("pass") int pass){
         return adminService.viewParticipantService(contest, pass);
    }



}
