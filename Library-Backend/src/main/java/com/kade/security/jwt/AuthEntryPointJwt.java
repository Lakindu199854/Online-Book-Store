package com.kade.security.jwt;

import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint{

    private static final Logger logger =LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,AuthenticationException authException) 
        throws IOException, ServletException 
    {
        //When a user comes to the application without a JWT token then a log is created and user
        //is given a response error saying the user is unauthorized 
        logger.error("Unauthorized error :{}",authException.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Error :Unauthorixed");
    }
}
