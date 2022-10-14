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
          <div className="header__akkaunt">
            <Link className="header__link header__link_account" to="/profil">
              Аккаунт
            </Link>
            <Link to="/profile">
              <img className="header__icon-img" src={iconMain} alt="Иконка юзера" />
            </Link>            
          </div>
        </>
      )}
    </header>
  );
}
export default Header;
