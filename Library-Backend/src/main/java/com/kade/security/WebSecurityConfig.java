package com.kade.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.kade.security.jwt.AuthEntryPointJwt;
import com.kade.security.jwt.AuthTokenFilter;
import com.kade.security.jwt.UserDetailsServiceImpl;

@Configuration
//For configurations we use this
@EnableMethodSecurity
public class WebSecurityConfig {

    //Now we bring in our utilities=========================================================================
    @Autowired
    UserDetailsServiceImpl userDetailsService;
        

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;
    
    @Bean
    public UserDetailsService userDetailsService(){
        return userDetailsService; 
    }
     
 

    @Bean 
    //Configgurations are written in Bean annotations
    public AuthTokenFilter authenticationJwAuthTokenFilter(){
        return new AuthTokenFilter();
    }

 
 
    @Bean 
    //Configgurations are written in Bean annotations
    public DaoAuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        //Encodes passwords before saving
        return authProvider;
    }


   //Here we define the password encoder
    private PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(null, 0);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception{
        return authConfig.getAuthenticationManager();
    }


    // Uptill noew we have taken in all the needed utilities from spring security and 
    // the utilities we have defined before.
    // Now lets the actual security configuration begins
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)throws Exception{
        //As we are devoloping the application seperatly as frontend and backend we dont use csrf
      http.csrf(csrf -> csrf.disable())
      .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      //setting the session manaegment policy
      .authorizeHttpRequests(auth -> 
        auth.requestMatchers("/auth/***").permitAll()
        //we only allow auth to be accessed without authentication
        .anyRequest().authenticated()
        );
    http.authenticationProvider(authenticationProvider());
    http.addFilterBefore(authenticationJwAuthTokenFilter(),UsernamePasswordAuthenticationFilter.class);
    //Filters the request
    return http.build();
    }

}