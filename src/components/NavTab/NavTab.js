import './NavTab.css';

function NavTab() {
  return (
    <div className="nav-tab">
      <a className="nav-tab__reg" href="/signup">
        Регистрация
      </a>
      <a className="nav-tab__enter" href="/signin">
        Войти
      </a>
    </div>
  );
}

export default NavTab;
