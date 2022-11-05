import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab() {
  return (
    <div className="nav-tab">
      <Link className="nav-tab__reg" to="/signup">
        Регистрация
      </Link>
      <Link className="nav-tab__enter" to="/signin">
        Войти
      </Link>
    </div>
  );
}

export default NavTab;
