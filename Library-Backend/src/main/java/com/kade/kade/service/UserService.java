package com.kade.kade.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kade.kade.entity.User;

@Service
public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User saveUser(User user);
    User updateUser(Long id,User user);
    void deleteUser(Long id);
}
