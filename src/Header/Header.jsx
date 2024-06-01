/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './header.css';
import logo from '../image/CinemaGuide.png';
import { InputSearch } from '../InputSearch/InputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveLink, setLoginStatus } from '../redux/actions';
import { Auth } from '../Auth/Auth';
import { fetchProfileData } from '../Module/Module';
import { ReactComponent as UserIcon } from '../image/user.svg';
export function Header() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const activeLink = useSelector((state) => state.activeLink);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchProfileData(setProfileData);
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      dispatch(setLoginStatus(JSON.parse(storedLoginStatus)));
    }
  }, [dispatch]);

  const handleLinkClick = (path) => {
    dispatch(setActiveLink(path));
    navigate(path);
  };

  const handleAuthOpen = () => {
    setAuthModalOpen(true);
  };

  const handleAuthClose = () => {
    setAuthModalOpen(false);
  };

  const updateProfileData = (newProfileData) => {
    setProfileData(newProfileData);
    setAuthModalOpen(false);
    dispatch(setLoginStatus(true));
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
            <InputSearch />
          </nav>
          {isLoggedIn ? (
            <button
              className={`header-link header-text ${
                activeLink === '/profile' ? 'header-link__active' : ''
              }`}
              onClick={() => handleLinkClick('/profile')}
            >
              {windowWidth < 790 ? (
                <UserIcon className="header-icon" />
              ) : (
                'Профиль'
              )}
            </button>
          ) : (
            <button className="header-btn" onClick={handleAuthOpen}>
              Войти
            </button>
          )}
        </div>
      </div>

      <Auth
        open={isAuthModalOpen}
        onClose={handleAuthClose}
        updateProfileData={updateProfileData}
      />
    </header>
  );
}
