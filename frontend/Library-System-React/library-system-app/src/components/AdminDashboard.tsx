import React, { useState, useEffect } from 'react';
import axios from "axios";
import { getBookById, getBorrowedBooks } from '../api/bookApi';
import "./Style/AdminDashboard.css";

interface User {
  userId: number;
  username: string;
}

interface Book {
  bookId: number;
  title: string;
  author: string;
}

interface BorrowedBook {
  borrowId: number;
  book: number;
  user: number;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [bookDetails, setBookDetails] = useState<Book[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [allBorrowed, setAllBorrowed] = useState<BorrowedBook[]>([]);

  const [currentView, setCurrentView] = useState<string>(""); // "borrows", "addBook", "createAdmin"


  // Fetch all users on page load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/all");
        if(response.data){
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  //Fetch count for borrowed books
  useEffect(() => {
    const fetchAllBorrowed = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/borrowed-books/all");
        if(response.data){
          setAllBorrowed(response.data);
        }
      } catch (error) {
        console.error("Error fetching borrowed:", error);
      }
    };

    fetchAllBorrowed();
  }, []);


  // Fetch borrowed books details for a specific user
  const fetchBorrowedBooks = async (userId: number) => {
    try {
      const borrowedBooksList = await getBorrowedBooks(userId);
      setBorrowedBooks(borrowedBooksList);

      const booksWithDetails = await Promise.all(
        borrowedBooksList.map(async (borrowedBook: { book: number; }) => {
          const bookDetail = await getBookById(borrowedBook.book);
          return bookDetail;
        })
      );

      setBookDetails(booksWithDetails);
      setSelectedUserId(userId);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching borrowed books or book details:", error);
    }
  };

  // Add new book
  const addNewBook = async (title: string, author: string, availableCopies: number) => {
    try {
      const response = await axios.post("http://localhost:8080/api/books", { title, author, availableCopies });
      console.log("Book added:", response.data);
      alert("Book Added");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed Adding book.");
    }
  };

  // Create new admin account
  const createAdminAccount = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        username,
        password,
        role: "ROLE_ADMIN",
      });
      console.log("Admin created:", response.data);
      alert("Admin Account Created");
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("Failed to create admin account.");
    }
  };



  return (
        <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-actions">
        <button onClick={() => setCurrentView("borrows")}>Show User Borrows</button>
        <button onClick={() => setCurrentView("addBook")}>Add New Book</button>
        <button onClick={() => setCurrentView("createAdmin")}>Create Admin Account</button>
      </div>

      {/* User Borrows */}
      {currentView === "borrows" && (
        <div>
          <h2>All Users</h2>
          <table >
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Num. of Borrowed Books</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>
                    {allBorrowed.filter((book) => book.user === user.userId).length}
                  </td>
                  <td>
                    <button onClick={() => fetchBorrowedBooks(user.userId)}>
                      Show Borrowed Books
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Book */}
      {currentView === "addBook" && (
        <div>
          <h2>Add New Book</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const title = (e.target as any).title.value;
              const author = (e.target as any).author.value;
              const availableCopies = (e.target as any).availableCopies.value;
              addNewBook(title, author, availableCopies);
            }}
          >
            <label>
              Title: <input type="text" name="title" required />
            </label>
            <label>
              Author: <input type="text" name="author" required />
            </label>
            <label>
              Available Copies: <input type="text" name="availableCopies" required />
            </label>
            <button type="submit">Add Book</button>
          </form>
        </div>
      )}

      {/* Create Admin */}
      {currentView === "createAdmin" && (
        <div>
          <h2>Create Admin Account</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const username = (e.target as any).username.value;
              const password = (e.target as any).password.value;
              createAdminAccount(username, password);
            }}
          >
            <label>
              Username: <input type="text" name="username" required />
            </label>
            <label>
              Password: <input type="password" name="password" required />
            </label>
            <button type="submit">Create Admin</button>
          </form>
        </div>
      )}

      {/* Modal to show borrowed books */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close-modal"
              onClick={() => {
                setShowModal(false);
                setBookDetails([]);
              }}
            >
              &times;
            </span>
            <h3>Borrowed Books for User ID: {selectedUserId}</h3>
            <ul>
              {bookDetails.map((book) => (
                <li key={book.bookId}>
                  {book.title} by {book.author}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
