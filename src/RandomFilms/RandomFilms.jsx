import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import './RandomFilms.css';
import rating from '../image/rating.png';
import favorite from '../image/favorite.png';
import favoriteActive from '../image/favorite-active.png';
import random from '../image/random.png';
import { CustomModal } from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useTrailer } from '../TrailerProvider/TrailerProvider';
import { TopFilms } from '../TopFilms/TopFilms';
import {
  fetchAnsfer,
  fetchModule,
  fetchProfileData,
  handleFavoriteClick,
} from '../Module/Module';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../redux/actions';
import { Auth } from '../Auth/Auth';

const fetchRandomFilm = () =>
  fetchModule('https://cinemaguide.skillbox.cc/movie/random');

export function RandomFilms() {
  const {
    showTrailerModal,
    selectedTrailerUrl,
    handleTrailerClick,
    handleCloseModal,
  } = useTrailer();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [favoritesResult, setFavoritesResult] = useState([]);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await fetchProfileData();
        setFavoritesResult(profileData.favorites);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };

    fetchData();
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

  const handleAuthClose = () => {
    setAuthModalOpen(false);
  };
  const handleAuthOpen = () => {
    setAuthModalOpen(true);
  };

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

  function testclick() {
    if (isLoggedIn) {
      handleFavoriteClick(film, dispatch);
      setFavoritesResult((prevFavorites) => {
        const newFavorites = [...prevFavorites];
        newFavorites.push(film.id.toString());
        return newFavorites;
      });
    } else {
      handleAuthOpen();
    }
  }

  const loadingOrErrorElement = fetchAnsfer(isLoading, isError);
  if (loadingOrErrorElement) {
    return loadingOrErrorElement;
  }

  return (
    <div className="films-body">
      <div className="films-main">
        {film ? (
          <div
            className="film-item"
            style={{ backgroundImage: `url(${film.backdropUrl})` }}
          >
            <div className="container film-container">
              <div className="film-mobile__img">
                <img src={film.backdropUrl} alt="poster" />
              </div>
              <div className="film-main">
                <div className="film-info">
                  <span className="film-info__rating">
                    <img src={rating} alt="rating" />
                    {film.tmdbRating.toFixed(1)}
                  </span>
                  <p className="film-info__text">{film.releaseYear}</p>
                  <p className="film-info__text">
                    {film.genres?.[0] || 'Unknown Genre'}
                  </p>
                  <p className="film-info__text">
                    {hours} ч {remainingMinutes} мин
                  </p>
                </div>
                <h1 className="film-title">{film.title}</h1>
                <p className="film-text">{film.plot}</p>
                <div className="button-group">
                  <button
                    className="film-btn trailer-btn"
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

                  <button
                    className={`film-btn film-btn__min`}
                    onClick={() => {
                      testclick();
                    }}
                  >
                    <img
                      className="favorite-icon"
                      src={
                        favoritesResult.includes(film.id.toString())
                          ? favoriteActive
                          : favorite
                      }
                      alt="favorite"
                    />
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
        )}
        <Auth
          open={isAuthModalOpen}
          onClose={handleAuthClose}
          updateProfileData={updateProfileData}
        />
      </div>
      <TopFilms />
    </div>
  );
}
