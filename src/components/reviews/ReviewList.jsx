// src/components/reviews/ReviewList.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
  const renderStars = (rating) => {
    const stars = [];
    for(let i=1; i<=5; i++) {
      if(i <= rating) {
        stars.push(<FontAwesomeIcon key={i} icon={['fas', 'star']} className="text-warning" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={['far', 'star']} className="text-warning" />);
      }
    }
    return stars;
  };

  return (
    <div className="review-section mb-5 ">
      <h3 className="review-title fs-4 fw-bold mb-4">Reviews</h3>
      <div className="review-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item d-flex align-items-start mb-4 bg-transparent">
              <img
                src={review.user.avatar_url || '/static/images/default-avatar.png'}
                alt={`${review.user.username}'s avatar`}
                className="review-avatar rounded-circle me-3"
                width="60"
                height="60"
                loading="lazy"
              />
              <div className="review-content">
                <div className="d-flex align-items-center mb-2">
                  <h5 className="review-username mb-0 me-2">{review.user.username}</h5>
                  <div className="review-stars">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="review-comment mb-1">{review.comment}</p>
                <small className="text-muted review-date">{new Date(review.created_at).toLocaleDateString()}</small>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      avatar_url: PropTypes.string,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  })).isRequired,
};

export default ReviewList;
