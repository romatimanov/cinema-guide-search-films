// RegisterSuccess.jsx
import React from 'react';
import { Modal, Fade } from '@mui/material';
import { styled } from '@mui/system';
import close from '../image/close-bl.png';
import logo from '../image/logo-modal.png';
import { Button } from '../Button/Button';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
`;

export function RegisterSuccess({
  openSuccess,
  onCloseSuccess,
  openAuthModal,
}) {
  const handleAuth = () => {
    onCloseSuccess();
    openAuthModal();
  };

  return (
    <StyledModal open={openSuccess} onClose={onCloseSuccess}>
      <Fade in={openSuccess}>
        <div className="auth-modal">
          <div className="auth-logo">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="success-title">Регистрация завершена</h2>
          <p className="success-text">
            Используйте вашу электронную почту для входа
          </p>
          <Button text="Войти" onClick={() => handleAuth()} />
          <button className="auth-close" onClick={onCloseSuccess}>
            <img src={close} alt="close" />
          </button>
        </div>
      </Fade>
    </StyledModal>
  );
}
