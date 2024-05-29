import { useQuery } from 'react-query';
import classes from './inputSearch.module.css';
import { useEffect, useRef, useState } from 'react';
import rating from '../image/rating.png';
import { useNavigate } from 'react-router-dom';
import { fetchAnsfer, fetchModule } from '../Module/Module';

const fetchSearchFilm = () =>
  fetchModule('https://cinemaguide.skillbox.cc/movie');

export function InputSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const searchShowRef = useRef(null);
  const {
    data: searchFilms,
    isLoading,
    isError,
  } = useQuery('genreFilms', fetchSearchFilm);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchShowRef.current &&
        !searchShowRef.current.contains(event.target)
      ) {
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilmClick = (film) => {
    setQuery('');
    navigate('/films', { state: { filmData: film } });
  };

  const loadingOrErrorElement = fetchAnsfer(isLoading, isError);
  if (loadingOrErrorElement) {
    return loadingOrErrorElement;
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredFilms = searchFilms
    .filter((film) => film.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  return (
    <div className={classes.searchContent}>
      <input
        type="text"
        placeholder="Поиск"
        className={classes.input}
        value={query}
        onChange={handleInputChange}
      />
      {query && (
        <div
          ref={searchShowRef}
          className={`${classes.searchShow} ${query ? classes.searchActive : ''}`}
        >
          {filteredFilms.map((film) => (
            <div
              key={film.id}
              className={classes.filmItem}
              onClick={() => handleFilmClick(film)}
            >
              <div className={classes.filmPoster}>
                <img src={film.posterUrl} alt="poster" />
              </div>
              <div className={classes.filmAbout}>
                <div className={classes.filmInfo}>
                  <span className={classes.filmRating}>
                    <img src={rating} alt="rating" />
                    {film.tmdbRating.toFixed(1)}
                  </span>
                  <p className={classes.filmText}>{film.releaseYear}</p>
                  <p className={classes.filmText}>
                    {film.genres?.[0] || 'Unknown Genre'}
                  </p>
                  <p className={classes.filmText}>
                    {Math.floor(film.runtime / 60)} ч {film.runtime % 60} мин
                  </p>
                </div>
                <h2 className={classes.filmTitle}>{film.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
