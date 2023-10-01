package com.kade.kade.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.kade.kade.entity.User;
import com.kade.kade.payloads.requests.LoginRequest;
import com.kade.kade.payloads.responses.JwtResponse;
import com.kade.kade.payloads.responses.MessageResponse;
import com.kade.kade.repository.UserRepository;
import com.kade.security.jwt.JwtUtils;

@CrossOrigin(origins="*")
@RestController
public class AuthController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/auth/register")
    //Here we dont use a service layer.We talk to the repository directly from the controller
    public ResponseEntity<?> registerUser(@RequestBody User user){
           //If both these conditons are Ok we save the user
        if(userRepository.existsByUsername(user.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Username already taken"));
        }
        if(userRepository.existsByUsername(user.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Email already taken"));
        }

        User newUser = new User(); 
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

       userRepository.save(newUser);
        return ResponseEntity.ok("User created successfully");

    }

     @PostMapping("/auth/login")
     public ResponseEntity<?> login(@RequestBody LoginRequest request){
        //Here we get the body as in the loginRequest-->Only the username and password
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        //Here we authenticate the user
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //If the  user authentication is successful then user is granted a JWT token
        //To generate the JWT token we use jwtUtils

        //Here we say "Generate a JWT token to this authentication"
        String jwt=jwtUtils.generateJwtToken(authentication);


        User user=userRepository.findByUsername(request.getUsername()).orElse(null);
        return ResponseEntity.ok(new JwtResponse(jwt,user.getId(),user.getUsername(),user.getEmail()));
     }
}
