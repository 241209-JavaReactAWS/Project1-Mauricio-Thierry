package com.MauricioThierry.library_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MauricioThierry.library_backend.model.BorrowedBook;
import com.MauricioThierry.library_backend.repository.BorrowedBookRepository;

@Service
public class BorrowedBookService {

    @Autowired
    private BorrowedBookRepository borrowedBookRepository;

    public List<BorrowedBook> getAllBorrowedBooks(){
        return borrowedBookRepository.findAll();
    }

    public List<BorrowedBook> getBorrowedBooksByUserId(Long userId){
        return borrowedBookRepository.findByUserId(userId);
    }

    public List<BorrowedBook> getBorrowedBooksByBookId(Long bookId){
        return borrowedBookRepository.findByBookId(bookId);
    }

    public BorrowedBook saveBorrowedBook(BorrowedBook borrowedBook){
        return borrowedBookRepository.save(borrowedBook);
    }

    public void deleteBorrowedBook(Long borrowId){
        borrowedBookRepository.deleteById(borrowId);
    }
}