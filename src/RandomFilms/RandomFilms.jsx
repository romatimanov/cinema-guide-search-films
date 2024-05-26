// random.j
import React from 'react';
import { useQuery } from 'react-query';
import './RandomFilms.css';
import rating from '../image/rating.png';
import favorite from '../image/favorite.png';
import random from '../image/random.png';
import { CustomModal } from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useTrailer } from '../TrailerProvider/TrailerProvider';

const fetchRandomFilm = async () => {
  const response = await fetch('https://cinemaguide.skillbox.cc/movie/random');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function RandomFilms() {
  const {
    showTrailerModal,
    selectedTrailerUrl,
    handleTrailerClick,
    handleCloseModal,
  } = useTrailer();
  const navigate = useNavigate();

  const {
    data: film,
    isLoading,
    isError,
    refetch,
  } = useQuery('randomFilm', fetchRandomFilm);

  const hours = Math.floor(film?.runtime / 60);
  const remainingMinutes = film?.runtime % 60;

  const handleRandomClick = () => {
    refetch();
  };

  if (isLoading) {
    return <div className="films-main">Loading...</div>;
  }

  if (isError) {
    return <div className="films-main">Error: Something went wrong</div>;
  }

  return (
    <div className="films-main">
      {film ? (
        <div
          className="film-item"
          style={{ backgroundImage: `url(${film.backdropUrl})` }}
        >
          <div className="container film-container">
            <div className="film-main">
              <div className="film-info">
                <span className="film-info__rating">
                  <img src={rating} alt="rating" />
                  {film.tmdbRating}
                </span>
                <p className="film-info__text">{film.releaseYear}</p>
                <p className="film-info__text">{film.genres[0]}</p>
                <p className="film-info__text">
                  {hours} ч {remainingMinutes} мин
                </p>
              </div>
              <h1 className="film-title">{film.title}</h1>
              <p className="film-text">{film.plot}</p>
              <div className="button-group">
                <button
                  className="film-btn"
                  onClick={() => handleTrailerClick(film.trailerYouTubeId)}
                >
                  Трейлер
                </button>

                <button
                  className="film-btn"
                  onClick={() =>
                    navigate('/films', { state: { filmData: film } })
                  }
                >
                  О фильме
                </button>

                <button className="film-btn film-btn__min">
                  <img src={favorite} alt="favorite" />
                </button>
                <button
                  className="film-btn film-btn__min"
                  onClick={handleRandomClick}
                >
                  <img src={random} alt="random" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No film available</p>
      )}
      {showTrailerModal && (
        <CustomModal
          trailerUrl={selectedTrailerUrl}
          onClose={handleCloseModal}
        />
      )}{' '}
    </div>
  );
}
