package com.kade.security.jwt;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    private static final Logger logger=LoggerFactory.getLogger(JwtUtils.class);
    
    @Value("${ijseapp.jwt.secret}")
    private String jwtSecret;

    @Value("${ijseapp.jwt.jwtExpiration}")
    private int jwtExpiration;

    public String generateJwtToken(Authentication authentication){
         UserDetails userPrincipal=(UserDetails) authentication.getPrincipal();
         return Jwts.builder()
         .setSubject((userPrincipal.getUsername()))
         .setIssuedAt(new Date())
         .setExpiration(new Date((new Date()).getTime()+jwtExpiration))
         .signWith(key(),SignatureAlgorithm.HS256)
         .compact();
    }

     //This function is used to sign the Jwt tocken using the secret
     //Here we don't use abcd12345 directly,We decode it using BASE64 decorder to 64 bits and use it.
    public Key key(){   
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public boolean validateJwtTocken(String authToken){
        try{
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken); //We should use the same key for the validation(This is obvious)
            return true; //here if the JWT is valid we return true
        }catch(MalformedJwtException e){
            logger.error("Invalid JWT token: ",e.getMessage());
        }catch(ExpiredJwtException e){
            logger.error("JWT token is expired : ",e.getMessage());
        }catch(UnsupportedJwtException e){
            logger.error("Unsupported JWT token: ",e.getMessage());
        }catch(IllegalArgumentException e){
            logger.error("JWT token payload is empty: ",e.getMessage());
        }
        return false;
    }
    public String getUsernameFromJwtToken(String authToken){
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken).getBody().getSubject();
    }
}
