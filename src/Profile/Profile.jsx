import { useNavigate } from 'react-router-dom';
import './profile.css';
import {
  fetchAnsfer,
  fetchData,
  fetchModule,
  windosSize,
} from '../Module/Module';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import close from '../image/close-bl.png';
import { ProfileSettings } from '../ProfileSettings/ProfileSettings';
import { ReactComponent as UserIcon } from '../image/user.svg';
import { ReactComponent as FavoriteIcon } from '../image/favorite.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';

const fetchFavoriteFilms = () =>
  fetchModule('https://cinemaguide.skillbox.cc/movie');

export function Profile() {
  const {
    data: films,
    isLoading,
    isError,
    refetch,
  } = useQuery('topFilms', fetchFavoriteFilms);

  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('Избранные фильмы');
  const [favoritesResult, setFavoritesResult] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = useMediaQuery({ maxWidth: 790 });
  useEffect(() => {
    windosSize(setWindowWidth);
  }, []);

  useEffect(() => {
    fetchData(setFavoritesResult);
  }, []);

  const loadingOrErrorElement = fetchAnsfer(isLoading, isError);
  if (loadingOrErrorElement) {
    return loadingOrErrorElement;
  }
  const favoriteNum = favoritesResult.map((item) => Number(item));
  const favoriteFilms = films.filter((film) => favoriteNum.includes(film.id));

  const handleRemoveFromFavorites = async (movieId) => {
    try {
      const response = await fetch(
        `https://cinemaguide.skillbox.cc/favorites/${movieId}`,
        {
          credentials: 'include',
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchData(setFavoritesResult);
      refetch();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderFilms = () => {
    return favoriteFilms.map((film, index) => {
      return (
        <article
          key={film.id}
          className="top-poster"
          onClick={() => navigate('/films', { state: { filmData: film } })}
        >
          <button
            className="poster-delete"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFromFavorites(film.id);
            }}
          >
            <img src={close} alt="delete" />
          </button>
          <img
            className="top-poster__image"
            src={film.posterUrl}
            alt="poster"
          />
        </article>
      );
    });
  };

  return (
    <div className="profile-main">
      <div className="container">
        <h1 className="profile-title">Мой аккаунт</h1>
        <div className="profile-btn__group">
          <button
            className={`profile-btn ${activeButton === 'Избранные фильмы' ? 'profile-btn__active' : ''}`}
            onClick={() => setActiveButton('Избранные фильмы')}
          >
            <FavoriteIcon className="profile-icon" />
            {windowWidth < 790 ? 'Избранное' : 'Избранные фильмы'}
          </button>
          <button
            className={`profile-btn ${activeButton === 'Настройка аккаунта' ? 'profile-btn__active' : ''}`}
            onClick={() => setActiveButton('Настройка аккаунта')}
          >
            <UserIcon className="profile-icon" />
            {windowWidth < 790 ? 'Настройки' : '  Настройка аккаунта'}
          </button>
        </div>
        <div className="profile-content">
          {activeButton === 'Избранные фильмы' ? (
            <div className="top-main">
              {isMobile ? (
                <Slider {...sliderSettings}>{renderFilms()}</Slider>
              ) : (
                renderFilms()
              )}
            </div>
          ) : (
            <ProfileSettings />
          )}
        </div>
      </div>
    </div>
  );
}

const sliderSettings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
