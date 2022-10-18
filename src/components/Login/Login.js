import '../Login/Login.css';
import logo from '../../images/logo.svg';

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';

function Login({ onLogin }) {
  const { values, handleChange } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.pass,
    });
  }

  return (
    <section className="register">
      <div className="login__contein">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </Link>
        <h3 className="login__title">Рады видеть!</h3>
        <form className="form" onSubmit={handleSubmit} method="post">
          <p className="form__text-field">E-mail</p>
          <input
            className="form__input"
            type="email"
            required
            placeholder="E-mail"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
          />
          <span className="form__error">Неверно заполенно поле</span>

          <p className="form__text-field">Пароль</p>
          <input
            className="form__input"
            type="password"
            required
            placeholder="password"
            name="pass"
            value={values.pass || ''}
            onChange={handleChange}
          />
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
