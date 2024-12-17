package com.MauricioThierry.library_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "borrowed_books")
public class BorrowedBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long borrowId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    public Book getBook() {
        return book;
    }
    public long getBorrowId() {
        return borrowId;
    }
    public User getUser() {
        return user;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
}
