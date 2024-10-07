import React, { useState } from "react";
import axiosInstance from "../../axios";
import Cookies from 'js-cookie';

const ReviewForm = ({ propertyId, onReviewAdded }) => {
  const [newReview, setNewReview] = useState({
    cleanliness: "",
    accuracy: "",
    communication: "",
    location: "",
    check_in: "",
    value: "",
    comment: ""
  });
  const [error, setError] = useState("");

  const ratingCategories = [
    'cleanliness',
    'accuracy',
    'communication',
    'location',
    'check_in',
    'value'
  ];

  const submitReview = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const authToken = Cookies.get('authToken');
      if (!authToken) {
        setError("You must be logged in to submit a review.");
        return;
      }

      const reviewData = { ...newReview };
      let isValid = true;

      ratingCategories.forEach(category => {
        const rating = parseInt(reviewData[category], 10); 
        if (isNaN(rating) || rating < 1 || rating > 5) {
          isValid = false;
          setError(`${category.charAt(0).toUpperCase() + category.slice(1)} rating must be between 1 and 5`);
        }
        reviewData[category] = rating;
      });

      if (!isValid) return;

      const overallRating = ratingCategories.reduce((sum, category) => sum + reviewData[category], 0) / ratingCategories.length;
      reviewData.rating = parseFloat(overallRating.toFixed(1));

      const response = await axiosInstance.post(
        `/api/properties/${propertyId}/reviews/create/`,
        reviewData,
        { headers: { 'Authorization': `Bearer ${authToken}` } }
      );

      if (response.status === 201 || response.status === 200) {
        onReviewAdded(response.data);
        setNewReview({
          cleanliness: "",
          accuracy: "",
          communication: "",
          location: "",
          check_in: "",
          value: "",
          comment: ""
        });
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
      {ratingCategories.map(category => (
        <div key={category} className="mb-3">
          <label htmlFor={category} className="form-label">
            {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
          </label>
          <input
            type="number"
            id={category}
            min="1"
            max="5"
            step="1" 
            value={newReview[category]}
            onChange={(e) =>
              setNewReview({ ...newReview, [category]: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
      ))}
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
