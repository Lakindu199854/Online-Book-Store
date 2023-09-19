package com.kade.kade.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kade.kade.entity.User;
import com.kade.kade.service.UserService;

@CrossOrigin(origins="*")

@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService; 
    }

    @GetMapping
    public List <User>getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity <User> getUserById(@PathVariable Long id){
        try{
            User user = userService.getUserById(id);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }catch(NoSuchElementException e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 

        }
   
    }

    @PostMapping
    public ResponseEntity <User> saveUser(@RequestBody User user){
        try{
            User userCreated = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(userCreated);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); 

        }
   
    }

     @PutMapping("/{id}")
      public ResponseEntity <User> updateUser(@PathVariable Long id,@RequestBody User user){
        try{
            User userUpdated = userService.updateUser(id,user);
            return ResponseEntity.status(HttpStatus.OK).body(userUpdated);

        }catch(NoSuchElementException e){
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 

        }
   
    }

    @DeleteMapping("/{id}")
    public ResponseEntity <Void> deleteUser(@PathVariable Long id){
         try{
           userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }catch(Exception e){
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 

        }
    }



    
}
