package com.hiringplatform.Contest.Controller;

import com.hiringplatform.Contest.Service.ControllerService.GuestService;
import com.hiringplatform.Contest.model.DTO.ResponseDTO;
import com.hiringplatform.Contest.model.Entity.Guest;
import com.hiringplatform.Contest.repos.Guestrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private GuestService guestService;

    @PostMapping("/login")
    public String loginService(@RequestBody Guest guest) {
        System.out.println(guest.getEmail());
        return "Working";
    }

    @GetMapping("/msg")
    public String hello() {
        return "hello";
    }
}
