package com.kade.kade.service;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kade.kade.entity.User;
import com.kade.kade.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
 

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository=userRepository;
        
    }

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

   
}