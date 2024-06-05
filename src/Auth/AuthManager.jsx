import { useState } from 'react';
import { Register } from '../Register/Register';
import { Auth } from './Auth';

export function AuthRegisterManager() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const handleOpenAuth = () => setAuthOpen(true);
  const handleCloseAuth = () => setAuthOpen(false);

  const handleOpenRegister = () => setRegisterOpen(true);
  const handleCloseRegister = () => setRegisterOpen(false);

  return (
    <>
      <button onClick={handleOpenAuth}>Open Auth</button>
      <button onClick={handleOpenRegister}>Open Register</button>
      {isAuthOpen && (
        <Auth
          open={isAuthOpen}
          onClose={handleCloseAuth}
          onOpenRegister={handleOpenRegister}
        />
      )}
      {isRegisterOpen && (
        <Register
          openRegister={isRegisterOpen}
          onCloseRegister={handleCloseRegister}
          onOpenAuth={handleOpenAuth}
        />
      )}
    </>
  );
}
