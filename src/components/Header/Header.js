import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import iconMain from '../../images/icon-main.svg';
import NavTab from '../../components/NavTab/NavTab.js';
import Navigation from '../../components/Navigation/Navigation.js';

function Header({ loggedIn }) {
  return (
    <header className={`header ${!loggedIn ? 'header_auth' : ''}`}>
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип"></img>
      </Link>
      {!loggedIn ? (
        <NavTab />
      ) : (
        <>
          <Navigation />
          <Link className="account__link" to="/profile">
            <p className="account__text">Аккаунт</p>
            <img className="account__icon" src={iconMain} alt="Иконка юзера" />
          </Link>
        </>
      )}
    </header>
  );
}
export default Header;
