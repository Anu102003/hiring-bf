package com.hiringplatform.Contest.Service.UserDetailsService;

import com.hiringplatform.Contest.model.Entity.Guest;
import com.hiringplatform.Contest.repos.Guestrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomGuestUserDetailsService implements UserDetailsService {

    @Autowired
    private Guestrepo guestrepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Guest guest = guestrepo.findByEmail(email);

        if (email == null) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
        return org.springframework.security.core.userdetails.User.builder()
                .username(guest.getEmail())
                .password(guest.getPassword())
                .roles("USER")
                .build();
    }
}
