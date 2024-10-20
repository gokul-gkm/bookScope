import api from './api';

export const getAllBooks = () => api.get('/books');
export const getBook = (id) => api.get(`/books/${id}`);
export const addBook = (bookData) => api.post('/books', bookData);
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);
export const deleteBook = (id) => api.delete(`/books/${id}`);