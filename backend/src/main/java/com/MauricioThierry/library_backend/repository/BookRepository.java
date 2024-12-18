package com.MauricioThierry.library_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MauricioThierry.library_backend.model.Book;
// import com.MauricioThierry.library_backend.model.User;

public interface BookRepository extends JpaRepository<Book, Long> {


    
}
