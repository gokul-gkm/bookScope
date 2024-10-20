import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/slices/bookSlice';
import { Link } from 'react-router-dom';
import {  FiChevronRight } from 'react-icons/fi';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-indigo-600">{book.title}</h2>
              <p className="text-gray-600 mb-4">{book.author}</p>
              
              <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
              <Link
                to={`/books/${book.id}`}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
              >
                View Details
                <FiChevronRight className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;