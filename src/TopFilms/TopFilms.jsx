import { useQuery } from 'react-query';
import './TopFilms.css';
import { useNavigate } from 'react-router-dom';
import { fetchAnsfer, fetchModule } from '../Module/Module';

const fetchTopFilms = () =>
  fetchModule('https://cinemaguide.skillbox.cc/movie/top10');

export function TopFilms() {
  const {
    data: films,
    isLoading,
    isError,
  } = useQuery('topFilms', fetchTopFilms);

  const navigate = useNavigate();

  const loadingOrErrorElement = fetchAnsfer(isLoading, isError);
  if (loadingOrErrorElement) {
    return loadingOrErrorElement;
  }

  return (
    <div className="container">
      <div className="top-content">
        <h2 className="top-title">Топ 10 Фильмов</h2>
        <div className="top-main">
          {films.map((film, index) => {
            return (
              <article
                key={film.id}
                className="top-poster"
                onClick={() =>
                  navigate('/films', { state: { filmData: film } })
                }
              >
                <span className="top-poster__number">{index + 1}</span>
                <img
                  className="top-poster__image"
                  src={film.posterUrl}
                  alt="poster"
                />
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
