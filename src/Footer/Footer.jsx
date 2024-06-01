import './footer.css';
import vk from '../image/footer/vk.png';
import youtube from '../image/footer/youtube.png';
import telegram from '../image/footer/telegram.png';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-text__group">
            <p className="footer-inc">LLC «Мультимедиа Визион»</p>
            <p className="footer-right">&#169; Все права защищены </p>
          </div>
          <div className="footer-icon__group">
            <a
              href="https://vk.com"
              target="_blank"
              className="footer-icon"
              rel="noreferrer"
            >
              <img src={vk} alt="vk" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-icon"
            >
              <img src={youtube} alt="vk" />
            </a>
            <a
              href="https://t.me/romatimanov"
              target="_blank"
              className="footer-icon"
              rel="noreferrer"
            >
              <img src={telegram} alt="vk" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
