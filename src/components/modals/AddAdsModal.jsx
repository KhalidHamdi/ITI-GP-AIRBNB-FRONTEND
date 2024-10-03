// AddAdsModal.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeAddAdsModal } from "../../redux/modalSlice";
import Modal from "./Modal";
import axiosInstance from "../../axios";

const AddAdsModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access modal open state and selected property from Redux
  const isOpen = useSelector((state) => state.modal.addAdsModalOpen);
  const property = useSelector((state) => state.modal.addAdsModalProperty);

  const close = () => {
    dispatch(closeAddAdsModal());
  };

  const initiatePayment = async (propertyId, cost) => {
    try {
      const response = await axiosInstance.post(`api/payments/property-ad/${propertyId}/initiate-payment/`, {
        cost: cost,
      });

      if (response.data.success) {
        // Redirect to the iframe URL for payment
        window.location.href = response.data.iframe_url;
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error('Payment initiation failed', error);
    }
  };
  const handleYes = () => {
    if (property) {
      const propertyId = property.id;
      const totalCost = Number((property.price_per_night * 0.1).toFixed(2)); // Ensure it's a number

      initiatePayment(propertyId, totalCost);

    }
  };

  const handleNo = () => {
    dispatch(closeAddAdsModal());
  };

  // Example condition: only allow promotion if property price is above $100
  const canPromote = property && property.price_per_night > 50;

  const content = (
    <div className="p-3 bg-light rounded shadow-lg">
      {canPromote && (
        <>
          <h3>Confirm Promotion</h3>
          <p>
            Are you sure you want to promote your property:{" "}
            <strong>{property?.title}</strong> ?
          </p>
          <h5
            style={{
              color: canPromote ? "orangered" : "red",
              marginTop: "40px",
            }}
          >
            it will cost you: {(property.price_per_night * 0.1).toFixed(2)} $
          </h5>
          <p style={{ marginBottom: "30px", color: 'grey' }}>10% of the total price</p>
        </>
      )}
      {canPromote ? (
        <>
          <button
            className="btn btn-success w-100 py-2 mb-3"
            onClick={handleYes}
          >
            Yes, Promote
          </button>
        </>
      ) : (
        <p className="text-danger">
          This property cannot be promoted (Price must be above $50).
        </p>
      )}
      <button className="btn btn-secondary w-100 py-2" onClick={handleNo}>
        Cancel
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      label="Promote Property"
      content={content}
    />
  );
};

export default AddAdsModal;
