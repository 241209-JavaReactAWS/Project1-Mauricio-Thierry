package com.MauricioThierry.library_backend.controller;

import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MauricioThierry.library_backend.model.User;
import com.MauricioThierry.library_backend.service.UserService;

import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);

        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/by-username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username){
        User user = userService.getUserByUsername(username);

        return user!= null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PostMapping    
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginHandler(@RequestBody User user, HttpSession session){
        User returnedUser = userService.login(user.getUsername(), user.getPassword());

        if(returnedUser == null){
            return ResponseEntity.badRequest().build();
        }

        session.setAttribute("username", returnedUser.getUsername());
        session.setAttribute("userId", returnedUser.getUserId());
        session.setAttribute("role", returnedUser.getRole());

        return ResponseEntity.ok(returnedUser);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        // To log a user out, we just invalidate the session
        session.invalidate();
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    
    
}
