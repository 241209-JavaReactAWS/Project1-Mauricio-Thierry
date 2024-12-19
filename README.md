# Project 1: Library System

## Introduction

The Library System allows users to manage library operations such as borrowing books and viewing borrowed books. It also includes administrative features for managing users and books. The application is built using Java with the Spring Boot framework for the backend, PostgreSQL (H2 for now) for the database, and basic HTML/CSS and JavaScript for the frontend (Transition to React in progress). The main objective of this project is to practice implementing CRUD operations, role-based access control, and seamless integration between the client and server.

## Frontend

### Login Page
- **Description**: Provides a login form for users and admins to authenticate using their credentials.
- **Person Responsible**: Thierry

### User Dashboard
- **Description**: Displays a list of borrowed books for regular users and allows them to borrow more books.
- **Person Responsible**: Mauricio

### Admin Dashboard
- **Description**: Displays a list of all users and their respective borrowed books. Includes functionality to add new books, remove borrowed books.
- **Person Responsible**: Thierry

### Book List Page
- **Description**: THIS PAGE IS NOW PART OF USER DASHBOARD
- **Person Responsible**: Mauricio

## Backend

The backend of the Library System will utilize a PostgreSQL (H2***) database to store and manage data.

### Database Schema

#### Users Table
- `user_id` (Primary Key)
- `username` (Unique, Non-Null)
- `password` (Non-Null)
- `role` (Enum: 'USER', 'ADMIN')

#### Books Table
- `book_id` (Primary Key)
- `title` (Non-Null)
- `author` (Non-Null)
- `available_copies` (Non-Null)

#### BorrowedBooks Table
- `borrow_id` (Primary Key)
- `user_id` (Foreign Key to Users)
- `book_id` (Foreign Key to Books)

### Backend Implementation

#### Database Connection
- **Description**: Set up a connection between the Spring Boot application and the PostgreSQL (H2***) database using Spring Data JPA. This includes defining `application.properties` with database credentials and configurations.
- **Person Responsible**: PersonA

#### Model Classes
- **Description**: Define entity classes for `User`, `Book`, and `BorrowedBook` to represent the database tables.
- **Person Responsible**: PersonB

#### Repository Layer
- **Description**: Create repository interfaces for performing CRUD operations on `User`, `Book`, and `BorrowedBook` entities.
- **Person Responsible**: PersonA

#### Service Layer
- **Description**: Implement service classes to encapsulate business logic for user authentication, book borrowing, and admin functionalities.
- **Person Responsible**: PersonB

#### Controller Layer
- **Description**: Develop RESTful endpoints for the frontend to interact with the backend. This includes login, viewing books, borrowing books, and admin management of books and users.
- **Person Responsible**: PersonA

#### Security Configuration
- **Description**: Configure Spring Security to handle authentication and role-based access control for users and admins.
- **Person Responsible**: PersonB


## Technologies Used
- **Backend**: Java, Spring Boot, Spring Data JPA
- **Database**: H2
- **Frontend**: HTML, CSS, React + Typescript
