package com.MauricioThierry.library_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MauricioThierry.library_backend.model.Book;
import com.MauricioThierry.library_backend.model.BorrowedBook;
import com.MauricioThierry.library_backend.service.BorrowedBookService;

@RestController
@CrossOrigin(origins = "http://localhost:5173") 
@RequestMapping("/api/borrowed-books")
public class BorrowedBookController {

    @Autowired
    private BorrowedBookService borrowedBookService;

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<BorrowedBook>> getBorrowedBookByUserId(@PathVariable Long userId){
       List<BorrowedBook> borrowedBooks = borrowedBookService.getBorrowedBooksByUserId(userId);
       return ResponseEntity.ok(borrowedBooks); 
    }

    @GetMapping("/by-book/{bookId}")
    public ResponseEntity<List<BorrowedBook>> getBorrowedBookByBookId(@PathVariable Long bookId){
       List<BorrowedBook> borrowedBooks = borrowedBookService.getBorrowedBooksByBookId(bookId);
       return ResponseEntity.ok(borrowedBooks); 
    }

    @GetMapping("/all")
    public ResponseEntity<List<BorrowedBook>> getAllBorrowedBooks(){
        List<BorrowedBook> borrowedBooks = borrowedBookService.getAllBorrowedBooks();
        return ResponseEntity.ok(borrowedBooks);
    }

    @PostMapping("/addBook")
    public ResponseEntity<BorrowedBook> borrowBook(@RequestBody Map<String, Object> requestBody) {
        // Extracting userId and bookId from the request body
        Long userId = Long.valueOf(requestBody.get("userId").toString());
        Long bookId = Long.valueOf(requestBody.get("bookId").toString());

        // Manually creating the BorrowedBook object
        BorrowedBook toSave = new BorrowedBook();
        toSave.setBook(bookId);
        toSave.setUser(userId);

        // Saving the BorrowedBook
        BorrowedBook savedBorrowedBook = borrowedBookService.saveBorrowedBook(toSave);

        return ResponseEntity.ok(savedBorrowedBook);
    }


    @DeleteMapping("/{borrowId}")
    public ResponseEntity<Void> returnBook(@PathVariable Long borrowId){
        borrowedBookService.deleteBorrowedBook(borrowId);

        return ResponseEntity.noContent().build();
    }
    
}
