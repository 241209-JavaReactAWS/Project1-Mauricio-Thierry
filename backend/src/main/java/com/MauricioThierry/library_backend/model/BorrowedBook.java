package com.MauricioThierry.library_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "borrowed_books")
public class BorrowedBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long borrowId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "book_id", nullable = false)
    private Long bookId;

    public Long getBook() {
        return bookId;
    }
    public Long getBorrowId() {
        return borrowId;
    }
    public Long getUser() {
        return userId;
    }

    public void setBook(Long bookId) {
        this.bookId = bookId;
    }

    public void setUser(Long userId) {
        this.userId = userId;
    }
    
}
