package com.MauricioThierry.library_backend.controller;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MauricioThierry.library_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

    User findByUsername(String username);

    
} 
