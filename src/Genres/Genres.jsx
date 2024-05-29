import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import './Genres.css';
import { useNavigate } from 'react-router-dom';
import { fetchAnsfer, fetchModule } from '../Module/Module';

const fetchGenres = () =>
  fetchModule('https://cinemaguide.skillbox.cc/movie/genres');

export function Genres() {
  const { data: genres, isLoading, isError } = useQuery('genres', fetchGenres);
  const [genreImages, setGenreImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      for (const genre of genres) {
        try {
          const { default: image } = await import(
            `../image/genres/${genre}.png`
          );
          images[genre] = image;
        } catch (error) {
          console.error(`Failed to load image for ${genre}:`, error);
          images[genre] = null;
        }
      }
      setGenreImages(images);
    };

    if (genres) {
      loadImages();
    }
  }, [genres]);

  const loadingOrErrorElement = fetchAnsfer(isLoading, isError);
  if (loadingOrErrorElement) {
    return loadingOrErrorElement;
  }

  return (
    <div className="container">
      <div className="genres-main">
        <h1 className="film-title genres-title">Жанры фильмов</h1>
        <div className="genres-content">
          {genres.map((film) => {
            return (
              <article
                className="genres-card"
                key={film}
                onClick={() =>
                  navigate('/genreFilms', { state: { filmData: film } })
                }
              >
                <div className="genres-image">
                  <img
                    className="genres-img"
                    src={genreImages[film]}
                    alt={film}
                  />{' '}
                </div>
                <p className="genres-name">{film}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
