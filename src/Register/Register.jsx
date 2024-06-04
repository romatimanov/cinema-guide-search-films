import React, { useState } from 'react';
import { Modal, Fade } from '@mui/material';
import { styled } from '@mui/system';
import close from '../image/close-bl.png';
import logo from '../image/logo-modal.png';
import { ReactComponent as MailIcon } from '../image/mail.svg';
import { ReactComponent as PassIcon } from '../image/pass.svg';
import { ReactComponent as UserIcon } from '../image/user.svg';
import { Button } from '../Button/Button';
import { RegisterSuccess } from './RegisterSuccess';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 400;
`;

export function Register({ openRegister, onCloseRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    surname: false,
  });

  const [registerSuccessOpen, setRegisterSuccessOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: value.trim() === '',
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, name, surname } = formData;
    const formErrors = {
      email: email.trim() === '',
      password: password.trim() === '',
      name: name.trim() === '',
      surname: surname.trim() === '',
    };
    setErrors(formErrors);

    if (!Object.values(formErrors).some((error) => error)) {
      try {
        const response = await fetch('https://cinemaguide.skillbox.cc/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            name,
            surname,
          }),
        });

        if (response.ok) {
          handleSuccess();
          console.log('User registered successfully!');
        } else {
          console.error('Failed to register user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSuccess = () => {
    setRegisterSuccessOpen(true);
    setTimeout(() => {
      onCloseRegister(true);
    }, 2500);
  };

  return (
    <>
      <StyledModal open={openRegister} onClose={onCloseRegister}>
        <Fade in={openRegister}>
          <div className="auth-modal">
            <div className="auth-logo">
              <img src={logo} alt="logo" />
            </div>
            <form className="form-auth" onSubmit={handleRegister}>
              <div className="input-wrapper">
                <MailIcon
                  className={`auth-icon ${errors.email ? 'error-icon' : ''}`}
                />
                <input
                  className={`auth-input ${errors.email ? 'error' : ''}`}
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <UserIcon
                  className={`auth-icon ${errors.name ? 'error-icon' : ''}`}
                />
                <input
                  className={`auth-input ${errors.name ? 'error' : ''}`}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <UserIcon
                  className={`auth-icon ${errors.surname ? 'error-icon' : ''}`}
                />
                <input
                  className={`auth-input ${errors.surname ? 'error' : ''}`}
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                />
              </div>
              <div className="input-wrapper">
                <PassIcon
                  className={`auth-icon ${errors.password ? 'error-icon' : ''}`}
                />
                <input
                  className={`auth-input ${errors.password ? 'error' : ''}`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button text={'Создать аккаунт'} type="submit" />
              <button className="auth-close" onClick={onCloseRegister}>
                <img src={close} alt="close" />
              </button>
            </form>
          </div>
        </Fade>
      </StyledModal>
      {registerSuccessOpen && (
        <RegisterSuccess
          openSucces={registerSuccessOpen}
          onCloseSuccess={() => setRegisterSuccessOpen(false)}
        />
      )}
    </>
  );
}
