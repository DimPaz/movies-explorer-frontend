import './Navigation.css';
import '../Header/Header.css';

import { NavLink } from 'react-router-dom';
import iconMain from '../../images/icon-main.svg';

function Navigation() {
  return (
    <nav className="navigation">
      <input
        className="navigation__toggle"
        id="navigation__toggle"
        type="checkbox"
      />
      <label className="navigation__btn" htmlFor="navigation__toggle">
        <span className="navigation__btn-img"></span>
      </label>
      <div className="navigation__container">
        <ul className="navigation__items">
          <li className="navigation__item navigation__item_type_mobile">
            <NavLink className="navigation__link" to="/">
              Главная
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink className="navigation__link" to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink className="navigation__link" to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink className="account__link account__link_nav" to="/profile">
          <p className="account__text">Аккаунт</p>
          <img className="account__icon" src={iconMain} alt="Иконка юзера" />
        </NavLink>
      </div>
      <div className="navigation__blackout"></div>
    </nav>
  );
}

export default Navigation;
