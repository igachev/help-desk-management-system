package com.api.help_desk_api.controllers;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.help_desk_api.dto.AuthResponseDto;
import com.api.help_desk_api.dto.LoginDto;
import com.api.help_desk_api.dto.RegisterDto;
import com.api.help_desk_api.exceptions.UserEntityNotFoundException;
import com.api.help_desk_api.models.Role;
import com.api.help_desk_api.models.UserEntity;
import com.api.help_desk_api.repositories.RoleRepository;
import com.api.help_desk_api.repositories.UserEntityRepository;
import com.api.help_desk_api.security.JWTGenerator;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private UserEntityRepository userEntityRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthController(
        AuthenticationManager authenticationManager,
        UserEntityRepository userEntityRepository,
        RoleRepository roleRepository,
        PasswordEncoder passwordEncoder,
        JWTGenerator jwtGenerator
    ) {
        this.authenticationManager = authenticationManager;
        this.userEntityRepository = userEntityRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {

        if(userEntityRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("user already exists!",HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        
        if(user.getEmail().equals("admin@abv.bg")) { 
        Role roles = roleRepository.findByName("ADMIN").get();
        user.setRoles(Collections.singletonList(roles));
        }
        else {
        Role roles = roleRepository.findByName("USER").get();
        user.setRoles(Collections.singletonList(roles));
        }

        userEntityRepository.save(user);
        return new ResponseEntity<>("User registered successfully",HttpStatus.OK);
    }
    
    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(
        @RequestBody LoginDto loginDto
        ) {
        Authentication authentication = authenticationManager
        .authenticate(
            new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword())
            );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);
        UserEntity user = userEntityRepository.findByEmail(loginDto.getEmail()).orElseThrow(); // Retrieve the user
        int userId = user.getId(); // Get userId
        
        return new ResponseEntity<>(new AuthResponseDto(token,userId),HttpStatus.OK);
    }
    
}
