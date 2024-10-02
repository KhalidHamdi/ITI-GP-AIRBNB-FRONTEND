// src/components/reviews/ReviewForm.js

import React, { useState } from "react";
import axiosInstance from "../../axios";
import Cookies from 'js-cookie';

const ReviewForm = ({ propertyId, onReviewAdded }) => {
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });
  const [error, setError] = useState("");

  const submitReview = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const authToken = Cookies.get('authToken');
      if (!authToken) {
        setError("You must be logged in to submit a review.");
        return;
      }

      const { rating, comment } = newReview;
      const parsedRating = parseInt(rating);

      if (parsedRating < 1 || parsedRating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }

      const response = await axiosInstance.post(
        `/api/properties/${propertyId}/reviews/create/`,
        { comment, rating: parsedRating },
        { headers: { 'Authorization': `Bearer ${authToken}` } }
      );

      if (response.status === 201 || response.status === 200) {
        onReviewAdded(response.data);
        setNewReview({ rating: "", comment: "" });
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "An error occurred while submitting the review.");
      } else if (error.request) {
        setError("Network error. Please try again.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <form onSubmit={submitReview} className="mb-4">
      <h4>Add a Review</h4>
      {error && <div className="alert alert-danger">{error}</div>}
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
