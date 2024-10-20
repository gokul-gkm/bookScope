const Review = require('../models/Review');
const reviewValidation = require('../validation/reviewValidation');
const editReviewValidation = require('../validation/editReviewValidation')
const grpc = require('@grpc/grpc-js');

const viewAllReviews = async (call, callback) => {
  try {
    const reviews = await Review.find();
    callback(null, { reviews });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error fetching reviews',
    });
  }
};

const viewReview = async (call, callback) => {
  try {
    const review = await Review.findById(call.request.id);
    if (!review) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Review not found',
      });
    }
    callback(null, { review });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error fetching review',
    });
  }
};

const addReview = async (call, callback) => {
  try {
    const { error } = reviewValidation.validate(call.request);
    if (error) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: error.details[0].message,
      });
    }

    const review = new Review(call.request);
    await review.save();

    callback(null, { review });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error adding review',
    });
  }
};

const editReview = async (call, callback) => {
  try {
    const { error } = editReviewValidation.validate(call.request);
    if (error) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: error.details[0].message,
      });
    }

    const review = await Review.findOneAndUpdate(
      { _id: call.request.id, userId: call.request.userId },
      call.request,
      { new: true }
    );
    if (!review) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Review not found or user not authorized',
      });
    }
    callback(null, { review });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error editing review',
    });
  }
};

const deleteReview = async (call, callback) => {
  try {
    const review = await Review.findOneAndDelete({ _id: call.request.id, userId: call.request.userId });
    if (!review) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Review not found or user not authorized',
      });
    }
    callback(null, {});
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error deleting review',
    });
  }
};

const getReviewsByBookId = async (call, callback) => {
  const { bookId } = call.request; 
  try {
      const reviews = await Review.find({ bookId });
      callback(null, { reviews });
  } catch (error) {
      console.error('Error fetching reviews:', error);
      callback({
          code: grpc.status.INTERNAL,
          details: 'Error fetching reviews',
      });
  }
};

module.exports = {
  viewAllReviews,
  viewReview,
  addReview,
  editReview,
  deleteReview,
  getReviewsByBookId
};
