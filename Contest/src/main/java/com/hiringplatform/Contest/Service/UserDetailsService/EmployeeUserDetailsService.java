package com.hiringplatform.Contest.Service.UserDetailsService;

import com.hiringplatform.Contest.model.Entity.Employee;
import com.hiringplatform.Contest.repos.Employeerepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class EmployeeUserDetailsService implements UserDetailsService {

    private final Employeerepo employeerepo;

    @Autowired
    public EmployeeUserDetailsService(Employeerepo employeerepo) {
        this.employeerepo = employeerepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeerepo.findByEmail(username);
        if(employee == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }

        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + employee.getRole()));
        return User.withUsername(employee.getEmail())
                .password(employee.getPassword())
                .authorities(authorities)
                .accountExpired(true)
                .accountLocked(true)
                .credentialsExpired(true)
                .disabled(true)
                .build();
    }
}
