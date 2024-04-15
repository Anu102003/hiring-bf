package com.hiringplatform.Contest.Controller;

import com.hiringplatform.Contest.model.Entity.Contest;
import com.hiringplatform.Contest.repos.Contestrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.Timestamp;
import java.util.List;

@Repository
public class ContestController {
    @Autowired
    Contestrepo contestrepo;
    @PostMapping("/addContest")
    public void addContest(@RequestBody Contest c){
        contestrepo.save(c);
    }

    @GetMapping("/getLiveContest")
    public List<Contest> getLiveContest(){
        Timestamp current = new Timestamp(System.currentTimeMillis());
        return contestrepo.findByEndTimeAfter(current);
    }

    @GetMapping("/getContestLog")
    public List<Contest> getContest(){
        Timestamp current = new Timestamp(System.currentTimeMillis());
        return contestrepo.findByEndTimeBefore(current);
    }

}
