/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomModal } from '../Modal/Modal';
import favorite from '../image/favorite.png';
import favoriteActive from '../image/favorite-active.png';
import rating from '../image/rating.png';
import { useTrailer } from '../TrailerProvider/TrailerProvider';
import { useDispatch, useSelector } from 'react-redux';
import './film.css';
import {
  fetchData,
  fetchProfileData,
  handleFavoriteClick,
} from '../Module/Module';
import { Auth } from '../Auth/Auth';
import { setLoginStatus } from '../redux/actions';

export function Film() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const { filmData } = location.state;
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [favoritesResult, setFavoritesResult] = useState([]);

  useEffect(() => {
    fetchData(setFavoritesResult);
  }, []);

  useEffect(() => {
    fetchProfileData(setProfileData);
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      dispatch(setLoginStatus(JSON.parse(storedLoginStatus)));
    }
  }, [dispatch]);

  const updateProfileData = (newProfileData) => {
    setProfileData(newProfileData);
    setAuthModalOpen(false);
    dispatch(setLoginStatus(true));
  };

  const {
    showTrailerModal,
    selectedTrailerUrl,
    handleTrailerClick,
    handleCloseModal,
  } = useTrailer();

  if (!location.state || !location.state.filmData) {
    navigate('/');
    return null;
  }

  const handleAuthClose = () => {
    setAuthModalOpen(false);
  };
  const handleAuthOpen = () => {
    setAuthModalOpen(true);
  };

  function testclick() {
    if (isLoggedIn) {
      handleFavoriteClick(filmData, dispatch);
      setFavoritesResult((prevFavorites) => {
        const newFavorites = [...prevFavorites];
        newFavorites.push(filmData.id.toString());
        return newFavorites;
      });
    } else {
      handleAuthOpen();
    }
  }

  function language() {
    let translatedText;

    switch (filmData.language) {
      case 'de':
        translatedText = 'German';
        break;
      case 'en':
        translatedText = 'English';
        break;
      default:
        translatedText = 'Default translation';
    }
    return translatedText;
  }

  return (
    <div className="films-body">
      <div className="films-main">
        <div
          className="film-item"
          style={{ backgroundImage: `url(${filmData.backdropUrl})` }}
        >
          <div className="container film-container">
            <div className="film-mobile__img">
              <img src={filmData.backdropUrl} alt="poster" />
            </div>
            <div className="film-main">
              <div className="film-info">
                <span className="film-info__rating">
                  <img src={rating} alt="rating" />
                  {filmData.tmdbRating.toFixed(1)}
                </span>
                <p className="film-info__text">{filmData.releaseYear}</p>
                <p className="film-info__text">{filmData.genres[0]}</p>
                <p className="film-info__text">
                  {Math.floor(filmData.runtime / 60)} ч {filmData.runtime % 60}{' '}
                  мин
                </p>
              </div>
              <h1 className="film-title">{filmData.title}</h1>
              <p className="film-text">{filmData.plot}</p>
              <div className="button-group">
                <button
                  className="film-btn"
                  onClick={() => handleTrailerClick(filmData.trailerYouTubeId)}
                >
                  Трейлер
                </button>
                <button
                  className={`film-btn film-btn__min`}
                  onClick={() => {
                    testclick();
                  }}
                >
                  <img
                    className="favorite-icon"
                    src={
                      favoritesResult.includes(filmData.id.toString())
                        ? favoriteActive
                        : favorite
                    }
                    alt="favorite"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Auth
          open={isAuthModalOpen}
          onClose={handleAuthClose}
          updateProfileData={updateProfileData}
        />
        {showTrailerModal && (
          <CustomModal
            trailerUrl={selectedTrailerUrl}
            onClose={handleCloseModal}
          />
        )}
      </div>
      <div className="film-about">
        <div className="container">
          <h2 className="film-about__title">О Фильме</h2>
          <div className="film-about__content">
            <div className="film-about__side">
              <p className="film-about__text">Язык оригинала</p>
              <span className="film-point">
                {Array(100).fill('.').join('')}
              </span>
            </div>
            <p className="film-about__text">{language()}</p>
          </div>
          <div className="film-about__content">
            <div className="film-about__side">
              <p className="film-about__text">Бюджет</p>
              <span className="film-point">
                {Array(100).fill('.').join('')}
              </span>
            </div>
            <p className="film-about__text">
              {filmData.budget ? filmData.budget : 'Неизвестно'}
            </p>
          </div>
          <div className="film-about__content">
            <div className="film-about__side">
              <p className="film-about__text">Выручка</p>
              <span className="film-point">
                {Array(100).fill('.').join('')}
              </span>
            </div>
            <p className="film-about__text">
              {filmData.revenue ? filmData.revenue : 'Неизвестно'}
            </p>
          </div>
          <div className="film-about__content">
            <div className="film-about__side">
              <p className="film-about__text">Режиссер</p>
              <span className="film-point">
                {Array(100).fill('.').join('')}
              </span>
            </div>
            <p className="film-about__text">
              {filmData.director ? filmData.director : 'Неизвестно'}
            </p>
          </div>
          <div className="film-about__content">
            <div className="film-about__side">
              <p className="film-about__text">Продакшн</p>
              <span className="film-point">
                {Array(100).fill('.').join('')}
              </span>
            </div>
            <p className="film-about__text">
              {filmData.production ? filmData.production : 'Неизвестно'}
            </p>
          </div>
          <div className="film-about__content">
            <div className="film-about__side">
              <p className="film-about__text">Награды</p>
              <span className="film-point">
                {Array(100).fill('.').join('')}
              </span>
            </div>
            <p className="film-about__text">
              {filmData.awardsSummary ? filmData.awardsSummary : 'Неизвестно'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
