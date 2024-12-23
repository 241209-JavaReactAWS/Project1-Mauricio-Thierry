package com.MauricioThierry.library_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MauricioThierry.library_backend.model.User;
import com.MauricioThierry.library_backend.repository.UserRepository;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;

    public User getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public Optional<User> getUserById(Long userId){
        return userRepository.findById(userId);
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(Long userId){
        userRepository.deleteById(userId);
    }

    public User login(String username, String password){
        return userRepository.findByUsernameAndPassword(username, password)
            .orElse(null);
    }
    public List<User> getAllUser(){
        return userRepository.findAll();
    }
    
}
