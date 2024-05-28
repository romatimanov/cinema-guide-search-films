import { useQuery } from 'react-query';
import './TopFilms.css';
import { useNavigate } from 'react-router-dom';

const fetchTopFilms = async () => {
  const response = await fetch('https://cinemaguide.skillbox.cc/movie/top10');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function TopFilms() {
  const {
    data: films,
    isLoading,
    isError,
  } = useQuery('topFilms', fetchTopFilms);

  const navigate = useNavigate();

  if (isLoading) {
    return <div className="top-content">Loading...</div>;
  }

  if (isError) {
    return <div className="top-content">Error: Something went wrong</div>;
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
