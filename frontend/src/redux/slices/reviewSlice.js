import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reviewService from '../../services/reviewService';

export const fetchReviewsByBookId = createAsyncThunk('reviews/fetchReviewsByBookId', async (bookId) => {
    const response = await reviewService.getReviewsByBookId(bookId);
    return response.data; // Return the reviews
});

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
    const response = await reviewService.getAllReviews();
    return response.data;
});

export const fetchReview = createAsyncThunk('reviews/fetchReview', async (id) => {
  const response = await reviewService.getReview(id);
  console.log("response : ", response)
    return response.data;
});

export const addReview = createAsyncThunk('reviews/addReview', async (reviewData) => {
    const response = await reviewService.addReview(reviewData);
    return response.data;
});

export const updateReview = createAsyncThunk('reviews/updateReview', async ({ id, reviewData }) => {
    const response = await reviewService.updateReview(id, reviewData);
    return response.data;
});

export const deleteReview = createAsyncThunk('reviews/deleteReview', async (id) => {
  const response = await reviewService.deleteReview(id);
  console.log("delete response : ",response)
    return id;
});

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        currentReview: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewsByBookId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviewsByBookId.fulfilled, (state, action) => {
                state.reviews = action.payload; // Set reviews for the specific book
                state.loading = false;
            })
            .addCase(fetchReviewsByBookId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.loading = false;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchReview.fulfilled, (state, action) => {
                state.currentReview = action.payload;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                const index = state.reviews.findIndex((review) => review.id === action.payload.id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
                if (state.currentReview && state.currentReview.id === action.payload.id) {
                    state.currentReview = action.payload;
                }
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter((review) => review.id !== action.payload);
                if (state.currentReview && state.currentReview.id === action.payload) {
                    state.currentReview = null;
                }
            });
    },
});

export default reviewSlice.reducer;