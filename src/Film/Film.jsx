import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomModal } from '../Modal/Modal';
import favorite from '../image/favorite.png';
import rating from '../image/rating.png';
import { useTrailer } from '../TrailerProvider/TrailerProvider';
import './film.css';

export function Film() {
  const location = useLocation();
  const navigate = useNavigate();
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
  const { filmData } = location.state;

  function language() {
    let translatedText;
    console.log(filmData.language);
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
    <div className="films-main">
      <div
        className="film-item"
        style={{ backgroundImage: `url(${filmData.backdropUrl})` }}
      >
        <div className="container film-container">
          <div className="film-main">
            <div className="film-info">
              <span className="film-info__rating">
                <img src={rating} alt="rating" />
                {filmData.tmdbRating}
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
              <button className="film-btn film-btn__min">
                <img src={favorite} alt="favorite" />
              </button>
            </div>
          </div>
        </div>
        <div className="film-about">
          <div className="container">
            <h2 className="film-about__title">О Фильме</h2>
            <div className="film-about__content">
              <div className="film-about__side">
                <div className="film-about__content">
                  <p className="film-about__text">Язык оригинала</p>
                  <span className="film-point">
                    {Array(100).fill('.').join('')}
                  </span>
                </div>
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
              <p className="film-about__text">1 руб</p>
            </div>
          </div>
        </div>
      </div>
      {showTrailerModal && (
        <CustomModal
          trailerUrl={selectedTrailerUrl}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
