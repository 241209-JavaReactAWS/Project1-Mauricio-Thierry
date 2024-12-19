import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getBooks = async()=>{
    try{
        const response = await axios.get(`${API_URL}/books`);
        return response.data;
    }catch (error){
        console.error("Issue Fetching List of Books", error);
        throw error;
    }
};

export const getBookById = async(bookId: number)=>{
    try{
        const response = await axios.get(`${API_URL}/books/${bookId}`);
        return response.data;
    }catch (error){
        console.error("Issue Fetching Book", error);
        throw error;
    }
};

export const getBorrowedBooks = async (userId: number)=>{
    try{
        const response = await axios.get(`${API_URL}/borrowed-books/by-user/${userId}`);
        return response.data;
    } catch (error){
        console.error("Error Fetching Borrowed Books", error);
        throw error;
    }
};
//NEEDS FIX -NOT ANYMORE
export const borrowBook = async (borrowedBook: { userId: number, bookId: number}) =>{
    try{
        console.log(borrowedBook);
        const response = await axios.post(`${API_URL}/borrowed-books/addBook`, borrowedBook);
        return response.data;
    } catch(error){
        console.error("Error Borrowing Book", error);
        throw error;
    }
};

export const returnBook = async (borrowId: number)=>{
    try{
        await axios.delete(`${API_URL}/borrowed-books/${borrowId}`);
    }catch (error){
        console.error("Error Returning Book", error);
        throw error;
    }
};