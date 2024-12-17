package com.MauricioThierry.library_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private Integer availableCopies;

    public String getAuthor() {
        return author;
    }
    public Integer getAvailableCopies() {
        return availableCopies;
    }
    public Long getBookId() {
        return bookId;
    }
    public String getTitle() {
        return title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setAvailableCopies(Integer availableCopies) {
        this.availableCopies = availableCopies;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
