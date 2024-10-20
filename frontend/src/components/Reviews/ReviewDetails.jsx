import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReview, deleteReview } from '../../redux/slices/reviewSlice';
import { FiStar, FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';

const ReviewDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentReview, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReview(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview(id))
        .unwrap()
        .then(() => {
          console.log("Review deleted successfully");
          if (currentReview && currentReview.bookId) {
            navigate(`/books/${currentReview.bookId}`);
          } else {
            console.error("Book ID not found in currentReview");
          }
        })
        .catch((error) => {
          console.error("Error deleting review:", error);
        });
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!currentReview) return <div className="text-center py-10">No review found.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">{currentReview.title}</h2>
          <p className="text-gray-700 mb-4">{currentReview.comment}</p>
          <div className="flex items-center mb-6">
            {[...Array(5)].map((_, index) => (
              <FiStar
                key={index}
                className={`w-6 h-6 ${
                  index < currentReview.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-gray-700 font-semibold">{currentReview.rating}/5</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/reviews/edit/${currentReview.id}`}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            >
              <FiEdit className="mr-2" /> Edit Review
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
            >
              <FiTrash2 className="mr-2" /> Delete Review
            </button>
            <Link
              to="/books"
              className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300"
            >
              <FiArrowLeft className="mr-2" /> Back to Book Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;