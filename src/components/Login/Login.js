import '../Login/Login.css';
import logo from '../../images/logo.svg';

function Login() {
  return (
    <section className="register">
      <div className="login__contein">
        <a href="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </a>
        <h3 className="login__title">Рады видеть!</h3>
        <form className="form" method="post">
          <p className="form__text-field">E-mail</p>
          <input className="form__input" type="email" required placeholder="E-mail"/>
          <span className="form__error">Неверно заполенно поле</span>

          <p className="form__text-field">Пароль</p>
          <input className="form__input" type="password" required placeholder="password"/>
          <span className="form__error">Неверно заполенно поле</span>

          <button className="form__submit" type="submit">
            Войти
          </button>
          <p className="form__text">
            Ещё не зарегистрированы?
            <a className="form__link" href="/signup">
              Регистрация
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
