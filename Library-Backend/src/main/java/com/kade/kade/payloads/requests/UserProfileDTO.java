package com.kade.kade.payloads.requests;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class UserProfileDTO {
    //When updating user's photo,we dont need the password,username and email .That is why we create this DTO
   
    private MultipartFile profileImage;
    //If we are doing a file upload the file type should be MultipartFile
    //This now accepts files not just a string

}


