import '../Footer/Footer.css';

function Futer() {
  return (
    <footer className="footer">
      <h4 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className="footer__contein">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <nav className="footer__nav">
          <ul className="footer__items">
            <li className="footer__item">
              <a
                className="footer__link"
                href="https://practicum.yandex.ru"
                target="blank"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item">
              <a
                className="footer__link"
                href="https://github.com"
                target="blank"
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Futer;
