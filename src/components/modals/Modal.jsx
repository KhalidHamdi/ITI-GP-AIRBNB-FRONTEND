import React, { useCallback, useEffect, useState } from "react";
import { Modal as BootstrapModal } from "react-bootstrap";

const Modal = ({ label, content, isOpen, close }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    close();
  }, [close]);

  return (
    <BootstrapModal show={showModal} onHide={handleClose} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{label}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{content}</BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
