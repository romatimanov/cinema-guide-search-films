import React from 'react';
import { Modal, Fade } from '@mui/material';
import { styled } from '@mui/system';
import close from '../image/close.png';
import './modal.css';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
`;

export function CustomModal({ trailerUrl, onClose }) {
  return (
    <StyledModal open={true} onClose={onClose}>
      <Fade in={true}>
        <div className="modal">
          <iframe
            src={trailerUrl}
            title="Movie Trailer"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          ></iframe>
          <button className="modal-close" onClick={onClose}>
            <img src={close} alt="close" />
          </button>
        </div>
      </Fade>
    </StyledModal>
  );
}
