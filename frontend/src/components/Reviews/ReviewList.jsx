import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiUser, FiCalendar } from 'react-icons/fi';

const ReviewList = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FiUser className="text-gray-500 mr-2" />
              <span className="font-semibold text-gray-700">{review.username}</span>
            </div>
            <div className="flex items-center">
              <FiCalendar className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{review.comment}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-gray-600">{review.rating}/5</span>
            </div>
            <Link
              to={`/reviews/${review.id}`}
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              View Full Review
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;