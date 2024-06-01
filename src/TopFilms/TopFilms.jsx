import { useQuery } from 'react-query';
import './TopFilms.css';
import { useNavigate } from 'react-router-dom';
import { fetchAnsfer, fetchModule } from '../Module/Module';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from 'react-responsive';

const fetchTopFilms = () =>
  fetchModule('https://cinemaguide.skillbox.cc/movie/top10');

export function TopFilms() {
  const {
    data: films,
    isLoading,
    isError,
  } = useQuery('topFilms', fetchTopFilms);

  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 790 });

  const loadingOrErrorElement = fetchAnsfer(isLoading, isError);
  if (loadingOrErrorElement) {
    return loadingOrErrorElement;
  }

  const renderFilmList = () => {
    return films.map((film, index) => {
      return (
        <article
          key={film.id}
          className="top-poster"
          onClick={() => navigate('/films', { state: { filmData: film } })}
        >
          <span className="top-poster__number">{index + 1}</span>
          <img
            className="top-poster__image"
            src={film.posterUrl}
            alt="poster"
          />
        </article>
      );
    });
  };

  if (isMobile) {
    return (
      <div className="container">
        <div className="top-content">
          <h2 className="top-title">Топ 10 Фильмов</h2>
          <div className="top-main">
            <Slider {...sliderSettings}>{renderFilmList()}</Slider>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="top-content">
        <h2 className="top-title">Топ 10 Фильмов</h2>
        <div className="top-main">{renderFilmList()}</div>
      </div>
    </div>
  );
}

const sliderSettings = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1.5,
  slidesToScroll: 1.5,
};
