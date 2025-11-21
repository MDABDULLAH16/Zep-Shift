import React from "react";
import { Quote } from "lucide-react";

const ReviewCard = ({ review }) => {
  

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto border">
      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-teal-400 mb-4" />

      {/* Review Text */}
      <p className="text-gray-600 leading-relaxed mb-6">{review.review}</p>

      {/* Divider */}
      <div className="border-t border-dashed border-teal-300 mb-6"></div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-900">
          {
            <img
              src={review.user_photoURL}
              alt="user"
              className="w-full h-full object-cover rounded-full"
            />
          }
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">{review.userName}</h3>
          <p className="text-gray-500 text-sm">{review.user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
