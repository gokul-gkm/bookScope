import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchReview, updateReview } from '../../redux/slices/reviewSlice';
import { FiStar } from 'react-icons/fi';

const EditReviewForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentReview, loading, error } = useSelector((state) => state.reviews);
  
//   const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(fetchReview(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentReview) {
    //   setTitle(currentReview.title);
      setComment(currentReview.comment);
      setRating(currentReview.rating);
    }
  }, [currentReview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReview({ id, reviewData: {  comment, rating } }))
      .unwrap()
      .then(() => {
        console.log("Review updated successfully");
        navigate(`/reviews/${id}`);
      })
      .catch((error) => {
        console.error("Error updating review:", error);
      });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Review</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Review Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div> */}
        <div className="mb-6">
          <label htmlFor="comment" className="block text-gray-700 text-sm font-bold mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows="4"
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400 focus:outline-none mr-1`}
              >
                <FiStar className="w-8 h-8" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Review
          </button>
          <Link
            to={`/reviews/${id}`}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditReviewForm;