package com.hiringplatform.Contest.auth;

import com.hiringplatform.Contest.Service.Jwt.JwtService;
import com.hiringplatform.Contest.Service.UserDetailsService.EmployeeUserDetailsService;
import com.hiringplatform.Contest.Service.UserDetailsService.GuestUserDetailsService;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomAuthProvider customAuthProvider;
    @Autowired
    private EmployeeUserDetailsService employeeUserDetailsService;

    @Autowired
    private GuestUserDetailsService guestUserDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    )   throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);

        String role = extractRolesFromJWT(jwt).toString();
        System.out.println(role);
        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = null;
            if(role.equals("[ROLE_ADMIN]") || role.equals("[ROLE_EMPLOYEE]")) {
                userDetails = employeeUserDetailsService.loadUserByUsername(userEmail);
            }
            else if (role.equals("[ROLE_GUEST]")) {
                userDetails = guestUserDetailsService.loadUserByUsername(userEmail);
            }

            if(jwtService.isTokenValid(jwt,userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }


    public List<String> extractRolesFromJWT(String jwt) {
        try {
            JWT jwtToken = JWTParser.parse(jwt);
            JWTClaimsSet claims = jwtToken.getJWTClaimsSet();
            return claims.getStringListClaim("Role");
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

}
