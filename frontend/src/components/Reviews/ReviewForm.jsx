import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../../redux/slices/reviewSlice';
import { FiStar } from 'react-icons/fi';

const ReviewForm = ({ bookId }) => {

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview({ bookId, comment, rating }));
    setComment('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between w-3/4">
        
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              onClick={() => setRating(star)}
              className={`${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-400 focus:outline-none cursor-pointer`}
              size={24}
            />
          ))}
        </div>
      </div>
      <textarea
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows="4"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className='flex flex-center'>
            
          
      <button
        type="submit"
        className="w-auto bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit Review
              </button>
              </div>
    </form>
  );
};

export default ReviewForm;