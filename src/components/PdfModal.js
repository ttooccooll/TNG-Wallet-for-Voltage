import React, { useState } from 'react';
import './PdfModal.css';

function PdfModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const playMP3 = () => {
    const audio = new Audio("/pleaserestateasinglequestion.mp3");
    audio.play();
  };

  const playMP4 = () => {
    const audio = new Audio("/computerbeep_69.mp3");
    audio.play();
  };

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
        onClick={() => { openModal(); playMP3(); }}
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
        <div className="modal-overlay"onClick={() => { closeModal(); playMP4(); }}>
          {/* Prevent clicks within the modal from closing it */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => { closeModal(); playMP4(); }}>
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
