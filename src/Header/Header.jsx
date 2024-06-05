/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import logo from '../image/CinemaGuide.png';
import search from '../image/search-mobile.png';
import { InputSearch } from '../InputSearch/InputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveLink, setLoginStatus } from '../redux/actions';
import { Auth } from '../Auth/Auth';
import { fetchProfileData, windosSize } from '../Module/Module';
import user from '../image/user.png';
import menu from '../image/menu.png';
import { Register } from '../Register/Register';
import { RegisterSuccess } from '../Register/RegisterSuccess';

export function Header() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const activeLink = useSelector((state) => state.activeLink);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const searchRef = useRef(null);

  useEffect(() => {
    windosSize(setWindowWidth);
  }, []);

  useEffect(() => {
    fetchProfileData(setProfileData);
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      dispatch(setLoginStatus(JSON.parse(storedLoginStatus)));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = (path) => {
    dispatch(setActiveLink(path));
    navigate(path);
  };

  const openRegisterModal = () => {
    setAuthModalOpen(false);
    setRegisterModalOpen(true);
  };

  const openAuthModal = () => {
    setRegisterModalOpen(false);
    setAuthModalOpen(true);
  };

  const openAuthSuccess = () => {
    setRegisterModalOpen(false);
    setSuccessModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const updateProfileData = (newProfileData) => {
    setProfileData(newProfileData);
    setAuthModalOpen(false);
    dispatch(setLoginStatus(true));
  };

  const toggleSearchVisibility = () => {
    setSearchVisible(!isSearchVisible);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo" onClick={() => handleLinkClick('/')}>
            <img src={logo} alt="logo" />
          </div>
          <nav className="header-nav">
            <ul className="header-list">
              <li className="header-item">
                <button
                  className={`header-link header-text ${
                    activeLink === '/' ? 'header-link__active' : ''
                  }`}
                  onClick={() => handleLinkClick('/')}
                >
                  Главная
                </button>
              </li>
              <li className="header-item">
                <button
                  className={`header-link header-text ${
                    activeLink === '/genres' ? 'header-link__active' : ''
                  }`}
                  onClick={() => handleLinkClick('/genres')}
                >
                  Жанры
                </button>
              </li>
            </ul>
            {windowWidth >= 790 && <InputSearch />}
          </nav>
          <div className="header-mobile">
            <button
              className="header-nav__icon"
              onClick={() => handleLinkClick('/genres')}
            >
              <img src={menu} alt="menu" />
            </button>
            <button
              className="header-nav__icon"
              onClick={toggleSearchVisibility}
            >
              <img src={search} alt="search" />
            </button>

            {isLoggedIn ? (
              <button
                className={`header-link header-text ${
                  activeLink === '/profile' ? 'header-link__active' : ''
                }`}
                onClick={() => handleLinkClick('/profile')}
              >
                {windowWidth < 790 ? <img src={user} alt="user" /> : 'Профиль'}
              </button>
            ) : (
              <button className="header-btn" onClick={openAuthModal}>
                {windowWidth < 790 ? <img src={user} alt="user" /> : 'Войти'}
              </button>
            )}
          </div>
        </div>
        {isSearchVisible && (
          <div ref={searchRef}>
            <InputSearch />
          </div>
        )}
      </div>

      <Auth
        open={isAuthModalOpen}
        onClose={closeAuthModal}
        openRegisterModal={openRegisterModal}
        updateProfileData={updateProfileData}
      />
      <Register
        openRegister={isRegisterModalOpen}
        onCloseRegister={closeRegisterModal}
        openAuthModal={openAuthModal}
        openAuthSuccess={openAuthSuccess}
      />
      <RegisterSuccess
        openSuccess={isSuccessModalOpen}
        onCloseSuccess={closeSuccessModal}
        openAuthModal={openAuthModal}
        openAuthSuccess={openAuthSuccess}
      />
    </header>
  );
}
