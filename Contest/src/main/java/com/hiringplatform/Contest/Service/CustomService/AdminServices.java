package com.hiringplatform.Contest.Service.CustomService;

import com.hiringplatform.Contest.model.DTO.MailDTO;
import com.hiringplatform.Contest.model.DTO.ResponseDTO;
import com.hiringplatform.Contest.model.Entity.Employee;
import com.hiringplatform.Contest.model.Entity.Guest;
import com.hiringplatform.Contest.repos.Guestrepo;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminServices {

    @Autowired
    private Guestrepo guestrepo;
    @Autowired
    private JavaMailSender javaMailSender;

    public static List<EmployeeGuestPair> assignGuestsToEmployees(List<Employee> employees, List<Guest> guests) {
        List<EmployeeGuestPair> employeeGuestPairs = new ArrayList<>();

        Map<String, List<Employee>> stackToEmployees = new HashMap<>();
        for (Employee employee : employees) {
            String stack = employee.getExpertise();
            List<Employee> employeesWithStack = stackToEmployees.getOrDefault(stack, new ArrayList<>());
            employeesWithStack.add(employee);
            stackToEmployees.put(stack, employeesWithStack);
        }

        for (String stack : stackToEmployees.keySet()) {

            List<Employee> employeesWithStack = stackToEmployees.get(stack);
            List<Guest> guestsWithStack = guests.stream().filter(guest -> guest.getStack().equals(stack)).toList();

            int remainder = guestsWithStack.size() % employeesWithStack.size();

            int guestPosition = 0;
            for (int i = 0; i < (int) (guestsWithStack.size() / employeesWithStack.size()); i++) {
                int guestCount = guestsWithStack.size();
                for (Employee employee : employeesWithStack) {
                    System.out.println(stack + " : " + guestPosition);
                    Guest guest = guestsWithStack.get(guestPosition);
                    if(guestCount == 0) break;
                    if(guestsWithStack.size() < employeesWithStack.size()){
                        employeeGuestPairs.add(new EmployeeGuestPair(employee, guest));
                        guestCount--;
                        continue;
                    }
                    if (guest.getStack().equals(employee.getExpertise())) {
                        employeeGuestPairs.add(new EmployeeGuestPair(employee, guest));
                    }
                    if(remainder != 0) {
                        employeeGuestPairs.add(new EmployeeGuestPair(employee, guest));
                        remainder--;
                    }
                    System.out.println(employee.getEid() + " : " + guest.getUserId() + " : " + stack);
                    guestPosition++;
                }
            }
        }

        return employeeGuestPairs;
    }

    @Getter
    public static class EmployeeGuestPair {
        private Employee employee;
        private Guest guest;

        public EmployeeGuestPair(Employee employee, Guest guest) {
            this.employee = employee;
            this.guest = guest;
        }
    }

    public ResponseEntity<ResponseDTO> sendMails(MailDTO mailStructure, int cid, int mark) {
        List<Guest> userList = guestrepo.findByMarks(cid, mark);
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("deepanr9786@gmail.com");
        for(Guest guest : userList) {
            simpleMailMessage.setSubject(mailStructure.getSubject());
            simpleMailMessage.setText(mailStructure.getMessage());
            simpleMailMessage.setTo(guest.getEmail());
            javaMailSender.send(simpleMailMessage);
        }
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDTO(HttpStatus.OK, "Mail sent" , null));    }
}
