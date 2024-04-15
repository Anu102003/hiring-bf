package com.hiringplatform.Contest.Controller;

import com.hiringplatform.Contest.Service.ControllerService.EmployeeService;
import com.hiringplatform.Contest.model.Entity.Guest;
import com.hiringplatform.Contest.model.DTO.ResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;
    @GetMapping("/getCandiDetails/{Gid}")
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getCandidatesDetails(@PathVariable int Gid){
        return employeeService.getCandidatesDetailsService(Gid);
    }

    @GetMapping("/getCandi/{Eid}")
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getCandidates(@PathVariable int Eid){
        return employeeService.getCandidatesService(Eid);
    }
    @PostMapping("/addFeedback/{Gid}")
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> getFeedback(@PathVariable int Gid, @RequestBody Guest g){
        return employeeService.getFeedbackService(Gid,g);
    }
    @GetMapping("/viewParticipants/{Cid}/{mark}")
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> viewParticipant(@PathVariable("Cid") int Cid, @PathVariable("mark") int mark){
        return employeeService.viewParticipantService(Cid, mark);
    }
    @GetMapping("/getPassed/{Cid}/{mark}")
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE','ROLE_ADMIN')")
    public ResponseEntity<ResponseDTO> passed(@PathVariable int Cid, @PathVariable int mark){
        return employeeService.passedService(Cid,mark);
    }

    

}
