import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as bookService from '../../services/bookService';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await bookService.getAllBooks();
  return response.data;
});

export const fetchBook = createAsyncThunk('books/fetchBook', async (id) => {
  const response = await bookService.getBook(id);
  return response.data;
});

export const addBook = createAsyncThunk('books/addBook', async (bookData) => {
  const response = await bookService.addBook(bookData);
  return response.data;
});

export const updateBook = createAsyncThunk('books/updateBook', async ({ id, bookData }) => {
  console.log("bookData : ",bookData)
  const response = await bookService.updateBook(id, bookData);
  console.log("update book response : ",response)
  return response.data;
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  await bookService.deleteBook(id);
  return id;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    currentBook: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.currentBook = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
        if (state.currentBook && state.currentBook.id === action.payload.id) {
          state.currentBook = action.payload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
        if (state.currentBook && state.currentBook.id === action.payload) {
          state.currentBook = null;
        }
      });
  },
});

export default bookSlice.reducer;