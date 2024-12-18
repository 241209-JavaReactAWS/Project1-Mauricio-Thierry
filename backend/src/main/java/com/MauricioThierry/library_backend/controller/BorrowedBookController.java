package com.MauricioThierry.library_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MauricioThierry.library_backend.model.BorrowedBook;
import com.MauricioThierry.library_backend.service.BorrowedBookService;

@RestController
@RequestMapping("/api/borrowed-books")
public class BorrowedBookController {

    @Autowired
    private BorrowedBookService borrowedBookService;

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<BorrowedBook>> getBorrowedBookByUserId(@PathVariable Long userId){
       List<BorrowedBook> borrowedBooks = borrowedBookService.getBorrowedBooksByUserId(userId);
       return ResponseEntity.ok(borrowedBooks); 
    }

    @GetMapping
    public ResponseEntity<List<BorrowedBook>> getAllBorrowedBooks(){
        List<BorrowedBook> borrowedBooks = borrowedBookService.getAllBorrowedBooks();
        return ResponseEntity.ok(borrowedBooks);
    }

    @PostMapping
    public ResponseEntity<BorrowedBook> borrowBook(@RequestBody BorrowedBook borrowedBook){
        BorrowedBook savedBorrowedBook = borrowedBookService.saveBorrowedBook(borrowedBook);

        return ResponseEntity.ok(savedBorrowedBook);
    }

    @DeleteMapping("/{borrowId}")
    public ResponseEntity<Void> returnBook(@PathVariable Long borrowId){
        borrowedBookService.deleteBorrowedBook(borrowId);

        return ResponseEntity.noContent().build();
    }
    
}
