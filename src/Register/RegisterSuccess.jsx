// RegisterSuccess.jsx
import React from 'react';
import { Modal, Fade } from '@mui/material';
import { styled } from '@mui/system';
import close from '../image/close-bl.png';
import logo from '../image/logo-modal.png';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
`;

export function RegisterSuccess({ openSucces, onCloseSuccess }) {
  return (
    <StyledModal open={openSucces} onClose={onCloseSuccess}>
      <Fade in={openSucces}>
        <div className="auth-modal">
          <div className="auth-logo">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="success-title">Регистрация завершенра</h2>
          <p className="success-text">
            Используйте вашу электронную почту для входа
          </p>
          <button className="auth-close" onClick={onCloseSuccess}>
            <img src={close} alt="close" />
          </button>
        </div>
      </Fade>
    </StyledModal>
  );
}
