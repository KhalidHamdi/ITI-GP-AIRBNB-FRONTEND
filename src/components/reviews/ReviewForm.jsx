import React, { useState } from "react";
import axiosInstance from "../../axios";
import Cookies from 'js-cookie';
import './ReviewForm.css';
import { ToastContainer, toast } from 'react-toastify'; 

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const ratingCategories = [
    'cleanliness',
    'accuracy',
    'communication',
    'location',
    'check_in',
    'value'
  ];

  const handleRatingChange = (category, rating) => {
    setNewReview({ ...newReview, [category]: rating });
  };



  const submitReview = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
        const authToken = Cookies.get('authToken');
        if (!authToken) {
            setError("You must be logged in to submit a review.");
            setLoading(false);
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

        if (!isValid) {
            setLoading(false);
            return;
        }

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
            toast.success("Thank you for your review!"); 
        }

    } catch (error) {
        if (error.response) {
            setError(error.response.data.error || "An error occurred while submitting the review.");
        } else if (error.request) {
            setError("Network error. Please try again.");
        } else {
            setError(error.message);
        }
    } finally {
        setLoading(false);
    }
};

return (
    <div className="review-form-container mt-1 border-top pt-3">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={submitReview} className="mb-2">
            {ratingCategories.map((category) => (
                <div key={category} className="mb-1"> 
                    <label htmlFor={category} className="form-label">
                        {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
                    </label>
                    <div className="star-rating">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={ratingValue}>
                                    <input
                                        type="radio"
                                        name={category}
                                        value={ratingValue}
                                        onClick={() => handleRatingChange(category, ratingValue)}
                                        className="d-none"
                                    />
                                    <span className={`star ${ratingValue <= newReview[category] ? 'filled' : ''}`}>&#9733;</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}
            <div className="mb-1"> 
                <label htmlFor="comment" className="form-label">Comment</label>
                <textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="form-control"
                    rows="3" 
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    </div>
);
};

export default ReviewForm;
