package com.kade.kade.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kade.kade.entity.User;
import com.kade.kade.payloads.requests.UserProfileDTO;
import com.kade.kade.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
 

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository=userRepository;
        
    }

    @Value("${upload.directory}")  //Value of upload.directory in the Application.properties is taken as a string
    private String uploadDirectory;


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
      
    }

    @Override
    public User getUserById(Long id){ 
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User Not Found"+id));
    }

    @Override
    public User saveUser(User user) {
       
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser=getUserById(id);
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(user.getPassword());
        existingUser.setEmail(user.getEmail());
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {
      userRepository.deleteById(id);
    }

    @Override
    public User updateUser(Long id,UserProfileDTO userProfileDTO) {
       User existingUser=userRepository.findById(id).orElse(null);
       
       if(existingUser!=null){
        MultipartFile file=userProfileDTO.getProfileImage();
        //Here the file uploads in the original file name.But we can also rename it.
        String filename=file.getOriginalFilename();
        String filePath=uploadDirectory+File.separator+filename;
        //Now here we save the uploaded file to the assigned directory
        try {
            file.transferTo(new File(filePath));
            System.out.println(1);
        } catch (IllegalStateException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        existingUser.setProfileImage(filename);
        return userRepository.save(existingUser);
       }
      return null;
    }
}