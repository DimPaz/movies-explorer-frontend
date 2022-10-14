import './Navigation.css';
import '../Header/Header.css';

import { Link } from 'react-router-dom';
import iconMain from '../../images/icon-main.svg';

function Navigation() {
  return (
    <nav className="navigation">
      <input
        className="navigation__toggle"
        id="navigation__toggle" 
        type="checkbox"
      />
      <label className="navigation__btn" for="navigation__toggle">
        <span className="navigation__btn-img"></span>
      </label>
      <div className="navigation__container">
        <ul className="navigation__items">
          <li className="navigation__item navigation__item_type_mobile">
            <a className="navigation__link" href="/">
              Главная
            </a>
          </li>
          <li className="navigation__item">
            <a className="navigation__link" href="/movies">
              Фильмы
            </a>
          </li>
          <li className="navigation__item">
            <a className="navigation__link" href="/saved-movies">
              Сохранённые фильмы
            </a>
          </li>
        </ul>
        <Link className="account__link account__link_nav" to="/profile">
          <p className="account__text">Аккаунт</p>
          <img className="account__icon" src={iconMain} alt="Иконка юзера" />
        </Link>
      </div>
      <div className="navigation__blackout"></div>
    </nav>
  );
}

export default Navigation;
