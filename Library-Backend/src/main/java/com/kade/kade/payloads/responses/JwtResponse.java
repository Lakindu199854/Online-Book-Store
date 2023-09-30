package com.kade.kade.payloads.responses;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String username;
    private String email;
    private Long id;

    public JwtResponse(String token,Long id,String username,String email){
        this.token=token;
        this.id=id;
        this.username=username;
        this.email=email;
    }
}
