import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ propertyId, onReviewAdded }) => {
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/properties/${propertyId}/reviews/create/`,
        newReview,
        { withCredentials: true }
      );
      onReviewAdded(response.data);
      setNewReview({ rating: "", comment: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="mb-5">
      <h4 className="fw-bold mb-3">Add a Review</h4>
      <form onSubmit={submitReview}>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Comment</label>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="form-control"
            rows="3"
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="btn w-100 mb-3" 
          style={{ backgroundColor: '#FF385C', borderColor: '#FF385C', color: '#ffffff' }}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
