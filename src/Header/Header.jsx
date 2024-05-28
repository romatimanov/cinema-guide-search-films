import './header.css';
import logo from '../image/CinemaGuide.png';
import { InputSearch } from '../InputSearch/InputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveLink } from '../redux/actions';

export function Header() {
  const activeLink = useSelector((state) => state.activeLink);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    dispatch(setActiveLink(path));
    navigate(path);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo" onClick={() => handleLinkClick('/')}>
            <img src={logo} alt="logo" />
          </div>
          <nav className="header-nav">
            <ul className="header-list">
              <li className="header-item">
                <button
                  className={`header-link header-text ${activeLink === '/' ? 'header-link__active' : ''}`}
                  onClick={() => handleLinkClick('/')}
                >
                  Главная
                </button>
              </li>
              <li className="header-item">
                <button
                  className={`header-link header-text ${activeLink === '/genres' ? 'header-link__active' : ''}`}
                  onClick={() => handleLinkClick('/genres')}
                >
                  Жанры
                </button>
              </li>
            </ul>
            <InputSearch />
          </nav>
          <a href="/logout" className="header-text">
            Выйти
          </a>
        </div>
      </div>
    </header>
  );
}
