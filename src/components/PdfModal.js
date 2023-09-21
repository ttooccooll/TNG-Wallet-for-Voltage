import React, { useState } from 'react';
import './PdfModal.css';

function PdfModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Open the modal when the "FAQ" link is clicked */}
      <span
        role="link"
        tabIndex={0}
        className="p"
        onClick={openModal}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            openModal();
          }
        }}
        style={{ color: '#D45F10', cursor: 'default', textDecoration: 'none' }}
        onMouseEnter={(e) => {
            e.target.style.opacity = '0.6'; // Reduce opacity on hover
          }}
        onMouseLeave={(e) => {
            e.target.style.opacity = '1'; // Restore opacity on mouse leave
          }}
      >
        FAQ
      </span>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          {/* Prevent clicks within the modal from closing it */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-inner">
              <iframe
                src={`${process.env.PUBLIC_URL}/TNGFAQ.jpg`}
                title="FAQ PDF"
                style={{ width: '612px', height: '792px' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfModal;
