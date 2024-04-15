package com.hiringplatform.Contest.Controller;

import com.hiringplatform.Contest.Service.ControllerService.GuestService;
import com.hiringplatform.Contest.model.DTO.LoginDTO;
import com.hiringplatform.Contest.model.Entity.Contest;
import com.hiringplatform.Contest.model.Entity.Guest;
import com.hiringplatform.Contest.model.DTO.ResponseDTO;
import com.hiringplatform.Contest.repos.Contestrepo;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/guest")
public class GuestController {
    @Autowired
    GuestService guestService;

    @Autowired
    Contestrepo contestrepo;

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> Login(@RequestBody LoginDTO loginDTO){
        return guestService.loginService(loginDTO);
    }
    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signUp(@RequestBody Guest g){
        return guestService.signupService(g);
    }

    @GetMapping("/viewScore/{Cid}")
    public ResponseEntity<ResponseDTO> viewScore(@PathVariable int Cid){
        return guestService.viewscoreService(Cid);
    }
    @PostMapping("/evaluate/{Gid}")
    public ResponseEntity<ResponseDTO> evaluate(@PathVariable int Gid,@RequestBody String output){
        return guestService.evaluateService(Gid,output);
    }

    @RequestMapping("/split/{id}/{pass_mark}")
    public ResponseEntity<ResponseDTO> split(@PathVariable("id") int id, @PathVariable("pass_mark") int pass_mark) {
        return guestService.sentToOneonOne(id, pass_mark);
    }

    @GetMapping("/getUserScore/{Cid}")
    public ResponseEntity<ResponseDTO> getUser(@PathVariable int Cid){
        return guestService.findUser(Cid);
    }

    @PutMapping("/addfeedback/{userId}")
    public Guest updateGuest(@PathVariable int userId, @RequestBody Guest updatedGuest) {
        return guestService.updateGuest(userId, updatedGuest);
    }

    @GetMapping("/contests/{userId}")
    public Object getContestIdsByUserId(@PathVariable int userId) {
        List<Object[]> con =  contestrepo.findContestByUserId(userId);
        String conName ="";
        if (!con.isEmpty()) {
            Object[] resultRow = con.get(0);
            if (resultRow.length > 0) {
                conName = (String) resultRow[0];
            }
        }
        return contestrepo.findByName(conName);
    }

    @PostMapping("/codeEvaluate/{GuestId}/{codeQuestionId}")
    public JSONObject codeEvaluate(@PathVariable int GuestId, @PathVariable String codeQuestionId, @RequestBody String code) throws IOException {
        return guestService.codeEvaluateService(GuestId,codeQuestionId,code);
    }
    @PostMapping("/codeSubmit/{GuestId}/{CodeQuestionId}")
    public void codeSubmit(@PathVariable int GuestId,@PathVariable String CodeQuestionId,@RequestBody String code) throws IOException {
        JSONObject jsonObject=guestService.codeEvaluateService(GuestId,CodeQuestionId,code);
        String output=(String)jsonObject.get("status");
        guestService.submitCode(output,code,GuestId,CodeQuestionId);
    }

}

