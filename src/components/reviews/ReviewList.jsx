import React from "react";

const ReviewList = ({ reviews }) => {
  return (
    <div className="mb-5">
      <h3 className="fs-4 fw-bold mb-4">Reviews</h3>
      <div className="mb-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border p-3 mb-3 rounded">
              <p>
                <strong>{review.user_name}</strong> rated{" "}
                <span className="text-warning">{review.rating}/5</span>
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
