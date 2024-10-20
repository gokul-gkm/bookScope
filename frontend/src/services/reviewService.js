import api from './api';

export const getAllReviews = () => api.get('/reviews');
export const getReview = (id) => api.get(`/reviews/${id}`);
export const getReviewsByBookId = (bookId) => api.get(`/reviews/book/${bookId}`); 
export const addReview = (reviewData) => api.post('/reviews', reviewData);
export const updateReview = (id, reviewData) => api.put(`/reviews/${id}`, reviewData);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);