import React, { useState } from 'react';
import { Modal, Fade } from '@mui/material';
import { styled } from '@mui/system';
import close from '../image/close-bl.png';
import logo from '../image/logo-modal.png';
import './auth.css';
import { ReactComponent as MailIcon } from '../image/mail.svg';
import { ReactComponent as PassIcon } from '../image/pass.svg';
import { Button } from '../Button/Button';
import { Register } from '../Register/Register';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
`;

export function Auth({ open, onClose, updateProfileData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(value.length < 3);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(value.length < 3);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(email.length === 0 || email.length < 3);
    setPasswordError(password.length === 0 || password.length < 3);

    if (email.length >= 3 && password.length >= 3) {
      try {
        const response = await fetch(
          'https://cinemaguide.skillbox.cc/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
          }
        );

        if (response.ok) {
          const profileResponse = await fetch(
            'https://cinemaguide.skillbox.cc/profile',
            {
              credentials: 'include',
            }
          );
          if (profileResponse.ok) {
            const profile = await profileResponse.json();
            updateProfileData(profile);
          }
        } else {
          console.error(
            'Failed to log in user:',
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleOpenRegister = () => {
    onClose();
    setRegisterOpen(true);
  };

  return (
    <>
      <StyledModal open={open} onClose={onClose}>
        <Fade in={open}>
          <div className="auth-modal">
            <div className="auth-logo">
              <img src={logo} alt="logo" />
            </div>
            <form className="form-auth" onSubmit={handleLogin}>
              <div className="input-wrapper">
                <MailIcon
                  className={`auth-icon ${emailError ? 'error-icon' : ''}`}
                />
                <input
                  className={`auth-input ${emailError ? 'error' : ''}`}
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="input-wrapper">
                <PassIcon
                  className={`auth-icon ${passwordError ? 'error-icon' : ''}`}
                />
                <input
                  className={`auth-input ${passwordError ? 'error' : ''}`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <Button text={'Войти'} type="submit" />
            </form>
            <button
              className="auth-register"
              onClick={() => {
                handleOpenRegister();
              }}
            >
              Регистрация
            </button>
            <button className="auth-close" onClick={onClose}>
              <img src={close} alt="close" />
            </button>
          </div>
        </Fade>
      </StyledModal>
      {registerOpen && (
        <Register
          openRegister={registerOpen}
          onCloseRegister={() => setRegisterOpen(false)}
        />
      )}
    </>
  );
}
