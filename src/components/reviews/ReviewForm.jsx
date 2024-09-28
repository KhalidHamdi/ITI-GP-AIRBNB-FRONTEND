import React, { useState } from "react";
import axiosInstance from "../../axios";
import Cookies from 'js-cookie';

const ReviewForm = ({ propertyId, onReviewAdded }) => {
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });

  const submitReview = async (event) => {
    event.preventDefault();
    
    try {
        const token = Cookies.get('authToken'); // Assuming you're storing a token in cookies
        
        const response = await fetch('/api/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the request header
            },
            body: JSON.stringify({ reviewText, rating }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit review');
        }

        const data = await response.json();
        console.log('Review submitted successfully:', data);
    } catch (error) {
        console.error('Error submitting review:', error);
    }
};


  return (
    <form onSubmit={submitReview} className="mb-4">
      <h4>Add a Review</h4>
      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          min="1"
          max="5"
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: e.target.value })
          }
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          Comment
        </label>
        <textarea
          id="comment"
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          className="form-control"
          rows="3"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;