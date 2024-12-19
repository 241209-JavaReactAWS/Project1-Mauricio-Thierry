package com.MauricioThierry.library_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MauricioThierry.library_backend.model.BorrowedBook;

public interface BorrowedBookRepository extends JpaRepository<BorrowedBook, Long> {

    List<BorrowedBook> findByUserId(Long userId);

    List<BorrowedBook> findByBookId(Long bookId);
    
}
