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
  bookDetail: Book;
  book: number;
  user: number;
}

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<any | null>(null); 
  const [userId, setUserId] = useState<any | null>(null); 
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/check-auth", { withCredentials: true });
        if (response.data) {
          setUser(response.data);
          setUserId(response.data.userId);
        }
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const refreshList = async () => {
    // Re-fetch available books
    const allBooks = await getBooks();

    // Re-fetch borrowed books and resolve full book details
    const borrowed = await getBorrowedBooks(userId);

    // Fetch full book details for borrowed books
    const borrowedBooksWithDetails = await Promise.all(
      borrowed.map(async (b: BorrowedBook) => {
        const bookDetails = await getBookById(b.book); // Fetch book details using bookId
        return { ...b, bookDetail: bookDetails }; // Add book details to borrowed book object
      })
    );

    // Filter out books that are already borrowed
    setBooks(
      allBooks.filter(
        (book: Book) =>
          !borrowedBooksWithDetails.some(
            (borrowedBook) => borrowedBook.bookDetail.bookId === book.bookId
          )
      )
    );
    setBorrowedBooks(borrowedBooksWithDetails); // Store the updated list of borrowed books
  };

  const handleBorrow = async (bookId: number) => {
    try {
      // Borrow the book
      await borrowBook({ userId, bookId });
  
      refreshList();

    } catch (error) {
      console.error("Failed to borrow book:", error);
    }
  };
  
  const handleReturn = async (borrowId: number) => {
    try {
      //return the book
      await returnBook(borrowId);
  
      refreshList();

    } catch (error) {
      console.error("Failed to return book:", error);
    }
  };
  
  
  return (
    <div>
      {user != null ? ( <h1>{user.username}'s Dashboard</h1>
          ): (
            <h1>Main Dashboard</h1>
          )}

      {books.length == 0 && borrowedBooks.length == 0 ? ( <button onClick={()=>refreshList()}>Load Dashboard</button>
          ): (
            <br/>
          )}
      
      {books.length > 0 && (
      <><h2>Available Books</h2><table>
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
        </table></>
      )}
  
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
                  <td>{borrowedBook.bookDetail.title}</td>
                  <td>{borrowedBook.bookDetail.author}</td>
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
