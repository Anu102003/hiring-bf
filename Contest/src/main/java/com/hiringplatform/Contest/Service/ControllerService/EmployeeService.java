package com.hiringplatform.Contest.Service.ControllerService;

import com.hiringplatform.Contest.model.Entity.Guest;
import com.hiringplatform.Contest.model.DTO.ResponseDTO;
import com.hiringplatform.Contest.repos.Contestrepo;
import com.hiringplatform.Contest.repos.Employeerepo;
import com.hiringplatform.Contest.repos.Guestrepo;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmployeeService {
    @Autowired
    Employeerepo employeerepo;
    @Autowired
    Guestrepo guestrepo;
    @Autowired
    Contestrepo contestrepo;

    public ResponseEntity<ResponseDTO> getCandidatesDetailsService(int Gid){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The participants are ", guestrepo.findAllocatedStudentsByEmployeeId(Gid)));
    }
    public ResponseEntity<ResponseDTO> getCandidatesService(int Eid){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The participants are ", employeerepo.findById(Eid).get().getGuest2()));
    }
    public ResponseEntity<ResponseDTO> getFeedbackService(int Gid,Guest guestObj){
        Guest guest = guestrepo.findById(Gid).get();
        guest.setUserFeedback(guestObj.getUserFeedback());
        guest.setAdminFeedback(guestObj.getAdminFeedback());
        guestrepo.save(guest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The feedbacks are saved", guest));
    }
    public ResponseEntity<ResponseDTO> viewParticipantService(int Cid, int mark){

        int participants = guestrepo.findByMarks(Cid,-1).size();
        int pass = guestrepo.findByMarks(Cid, mark).size();
        int nomParticipants = guestrepo.findByContestOrderByTotalMarksDesc(contestrepo.findById(Cid).get()).size()-participants;
        int fail = participants-pass;
        Map<String, Integer> map = new HashMap<>();
        map.put("participants",participants);
        map.put("Non participants",nomParticipants);
        map.put("pass", pass);
        map.put("fail", fail);

        Object passDetails = new JSONObject(map);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The contest report is", passDetails));
    }

    public ResponseEntity<ResponseDTO> passedService(int Cid,int mark){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "The passed candidates are ", guestrepo.findByMarks(Cid,mark)));
    }


}
