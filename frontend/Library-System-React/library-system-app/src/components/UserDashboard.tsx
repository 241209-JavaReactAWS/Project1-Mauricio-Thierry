import React, { useState, useEffect } from 'react';
import { getBooks, getBookById, getBorrowedBooks, borrowBook, returnBook } from '../api/bookApi';
import axios from "axios";
import "./Style/UserDashboard.css"


interface Book {
  bookId: number;
  title: string;
  author: string;
}

interface BorrowedBook {
  borrowId: number;
  book: Book;
  userId: number;
}

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/check-auth", { withCredentials: true });
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const userId = user?.userId;

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await getBooks();
      const borrowed = await getBorrowedBooks(user.userId);
      setBooks(allBooks.filter((book: Book) => !borrowed.some((b: BorrowedBook) => b.book.bookId === book.bookId)));
      setBorrowedBooks(borrowed);
    };
    fetchBooks();
  }, [userId]);

  useEffect(() =>{

    const refreshList = async() =>{

      // Re-fetch available books
      const allBooks = await getBooks();
  
      // Re-fetch borrowed books and resolve full book details
      const borrowed = await getBorrowedBooks(userId);
      const borrowedBooksWithDetails = await Promise.all(
        borrowed.map(async (b: { book: number; }) => {
          const bookDetails = await getBookById(b.book);
          return { ...b, book: bookDetails };
        })
      );

      setBooks(allBooks.filter((book: Book) => !borrowed.some((b: { bookId: number; }) => b.bookId === book.bookId)));
      setBorrowedBooks(borrowedBooksWithDetails);

    };
    refreshList();
  })

  const handleBorrow = async (bookId: number) => {
    try {
      // Borrow the book
      await borrowBook({ userId, bookId });
  
      // Re-fetch available books
      const allBooks = await getBooks();
  
      // Re-fetch borrowed books and resolve full book details
      const borrowed = await getBorrowedBooks(userId);
      const borrowedBooksWithDetails = await Promise.all(
        borrowed.map(async (b: { book: number; }) => {
          const bookDetails = await getBookById(b.book);
          return { ...b, book: bookDetails };
        })
      );
  
      setBooks(allBooks.filter((book: Book) => !borrowed.some((b: { bookId: number; }) => b.bookId === book.bookId)));
      setBorrowedBooks(borrowedBooksWithDetails);
    } catch (error) {
      console.error("Failed to borrow book:", error);
    }
  };
  
  const handleReturn = async (borrowId: number) => {
    try {
      // Call the API to return the book
      await returnBook(borrowId);
  
      // Re-fetch available books
      const allBooks = await getBooks();
  
      // Re-fetch borrowed books and resolve full book details
      const borrowed = await getBorrowedBooks(userId);
      const borrowedBooksWithDetails = await Promise.all(
        borrowed.map(async (b: { book: number; }) => {
          const bookDetails = await getBookById(b.book);
          return { ...b, book: bookDetails }; 
        })
      );

      setBooks(allBooks.filter((book: Book) => !borrowed.some((b: { book: number; }) => b.book === book.bookId)));
      setBorrowedBooks(borrowedBooksWithDetails);
    } catch (error) {
      console.error("Failed to return book:", error);
    }
  };
  
  
  return (
    <div>
      <h1>User Dashboard</h1>
        
      <h2>Available Books</h2>
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <button onClick={() => handleBorrow(book.bookId)}>Borrow</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
      {borrowedBooks.length > 0 && ( // Only render this section if there are borrowed books
        <>
          <h2>Borrowed Books</h2>
          <table>
            <thead>
              <tr>
                <th>Rent ID</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((borrowedBook) => (
                <tr key={borrowedBook.borrowId}>
                  <td>{borrowedBook.borrowId}</td>
                  <td>{borrowedBook.book.title}</td>
                  <td>{borrowedBook.book.author}</td>
                  <td>
                    <button onClick={() => handleReturn(borrowedBook.borrowId)}>Return</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
  
  
};

export default UserDashboard;
