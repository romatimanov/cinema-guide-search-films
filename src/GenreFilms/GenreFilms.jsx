import { useQuery } from 'react-query';
import './genreFilms.css';
import { useLocation, useNavigate } from 'react-router-dom';
import arrow from '../image/arrow.png';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { fetchAnsfer, fetchModule } from '../Module/Module';

const fetchGenreFilms = () =>
  fetchModule('https://cinemaguide.skillbox.cc/movie');

export function GenreFilms() {
  const { state } = useLocation();
  const genre = state?.filmData;
  const [displayedFilms, setDisplayedFilms] = useState(8);
  const navigate = useNavigate();

  const {
    data: genreFilms,
    isLoading,
    isError,
  } = useQuery('genreFilms', fetchGenreFilms);

  const loadingOrErrorElement = fetchAnsfer(isLoading, isError);
  if (loadingOrErrorElement) {
    return loadingOrErrorElement;
  }
  const filteredFilms = genreFilms.filter((film) =>
    film.genres.includes(genre)
  );

  const loadMoreFilms = () => {
    setDisplayedFilms((prevCount) => prevCount + 10);
  };

  return (
    <div className="container">
      <div className="genres-main">
        <button className="genres-btn" onClick={() => navigate('/genres')}>
          <img className="genres-btn__image" src={arrow} alt="arrow" />
          {genre}
        </button>
        <div className="genres-content genre-film__content">
          {filteredFilms.slice(0, displayedFilms).map((film) => (
            <article
              key={film.id}
              className="top-poster"
              onClick={() => navigate('/films', { state: { filmData: film } })}
            >
              <img
                className="top-poster__image"
                src={film.posterUrl}
                alt="poster"
              />
            </article>
          ))}
        </div>
        {filteredFilms.length > displayedFilms && (
          <Button text={'Показать еще '} onClick={loadMoreFilms} />
        )}
      </div>
    </div>
  );
}
