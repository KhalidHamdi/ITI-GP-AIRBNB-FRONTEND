import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import Cookies from 'js-cookie';

const ReviewForm = ({ propertyId, onReviewAdded }) => {
  const [newReview, setNewReview] = useState({ rating: "", comment: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    setIsLoggedIn(!!authToken);
  }, []);
  const submitReview = async (event) => {
    event.preventDefault();
    setError("");
    
    if (!isLoggedIn) {
      setError("You must be logged in to submit a review.");
      return;
    }
  
    try {
      const { rating, comment } = newReview;
      
      if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }
  
      console.log('Submitting review data:', { propertyId, comment, rating });  // Log the review data
  
      const response = await axiosInstance.post(
        `/api/properties/${propertyId}/reviews/create/`,
        { comment, rating: parseInt(rating) }  // Ensure rating is an integer
      );
  
      if (response.status === 201 || response.status === 200) {
        onReviewAdded(response.data);
        setNewReview({ rating: "", comment: "" });
        console.log('Review submitted successfully:', response.data);
      }
  
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "An error occurred while submitting the review.");
        console.log('Error response:', error.response);  // Log the full error response
      } else if (error.request) {
        setError("Network error. Please try again.");
        console.log('Network error:', error.request);  // Log the request that errored
      } else {
        setError(error.message);
      }
      console.error('Error submitting review:', error);
    }
  };
  


  if (!isLoggedIn) {
    return <p>Please log in to submit a review.</p>;
  }

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