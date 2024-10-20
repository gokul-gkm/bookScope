import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, deleteBook } from '../../redux/slices/bookSlice';
import { fetchReviewsByBookId } from '../../redux/slices/reviewSlice';
import ReviewList from '../Reviews/ReviewList';
import ReviewForm from '../Reviews/ReviewForm';
import { FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBook, loading, error } = useSelector((state) => state.books);
  const { reviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchBook(id));
    dispatch(fetchReviewsByBookId(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id))
        .unwrap()
        .then(() => {
          console.log("Book deleted successfully");
          navigate('/books');
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
        });
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!currentBook) return null;

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-indigo-600">{currentBook.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">By {currentBook.author}</h2>
          <p className="text-gray-700 mb-6">{currentBook.description}</p>
          <div className="flex space-x-4 mb-6">
            <Link
              to={`/books/edit/${id}`}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300"
            >
              <FiEdit className="mr-2" /> Edit Book
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
            >
              <FiTrash2 className="mr-2" /> Delete Book
            </button>
          </div>
          <Link
            to="/books"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <FiArrowLeft className="mr-2" /> Back to Book List
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <ReviewList reviews={reviews} />
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
        <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Add a Review</h3>
                  <ReviewForm bookId={id} />
        </div>
      </div>
    </div>
  );
};

export default BookDetails;