const Book = require('../models/Book');
const bookValidation = require('../validation/bookValidation');
const editBookValidation = require('../validation/editBookValidation')
const grpc = require('@grpc/grpc-js');

const viewAllBooks = async (call, callback) => {
  try {
    const books = await Book.find();
    callback(null, { books });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error fetching books',
    });
  }
};

const viewBook = async (call, callback) => {
  try {
    const book = await Book.findById(call.request.id);
    if (!book) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Book not found',
      });
    }
    callback(null, { book });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error fetching book',
    });
  }
};

const addBook = async (call, callback) => {
  try {
    const { error } = bookValidation.validate(call.request);
    if (error) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: error.details[0].message,
      });
    }

    console.log(call.request,"call request")

    const book = new Book(call.request);
    await book.save();
    callback(null, { book });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error adding book',
    });
  }
};

const editBook = async (call, callback) => {
  try {
    const { error } = editBookValidation.validate(call.request);
    if (error) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: error.details[0].message,
      });
    }

    const book = await Book.findByIdAndUpdate(call.request.id, call.request, { new: true });
    if (!book) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Book not found',
      });
    }
    callback(null, { book });
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error editing book',
    });
  }
};

const deleteBook = async (call, callback) => {
  try {
    const book = await Book.findByIdAndDelete(call.request.id);
    if (!book) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: 'Book not found',
      });
    }
    callback(null, {});
  } catch (error) {
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error deleting book',
    });
  }
};

module.exports = {
  viewAllBooks,
  viewBook,
  addBook,
  editBook,
  deleteBook,
};