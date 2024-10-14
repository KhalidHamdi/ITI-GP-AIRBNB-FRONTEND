import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './PropertyImageModal.css';

const PropertyImageModal = ({ images, show, onHide }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Property Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="image-grid">
          {images.map((imgObj, index) => (
            <img
              key={index}
              src={imgObj.image}
              alt={`Property ${index + 1}`}
              className="grid-image"
              onClick={() => setSelectedImage(imgObj.image)}
            />
          ))}
        </div>
        {selectedImage && (
          <div className="selected-image-container">
            <img src={selectedImage} alt="Selected" className="selected-image" />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PropertyImageModal;