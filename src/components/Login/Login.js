import '../Login/Login.css';
import logo from '../../images/logo.svg';

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';

function Login({ onLogin, infoTextErrorReg }) {
  const { values, handleChange, error, isValid } = useForm({});

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
        <form className="form" onSubmit={handleSubmit} method="post" noValidate>
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
          <span
            className={`form__error ${error.email ? '' : 'form__error_none'}`}
          >
            {error.email}
          </span>

          <p className="form__text-field">Пароль</p>
          <input
            className="form__input"
            type="password"
            minLength="3"
            required
            placeholder="password"
            name="pass"
            value={values.pass || ''}
            onChange={handleChange}
          />
          <span
            className={`form__error ${error.pass ? '' : 'form__error_none'}`}
          >
            {error.pass}
          </span>

          <span
            className={`form__error_reg ${
              !infoTextErrorReg ? '' : 'form__error_enabled'
            }`}
          >
            Ошибка авторизации
          </span>

          <button
            className={`form__submit ${
              !isValid
                ? 'form__submit_type_disabled'
                : 'form__submit_type_enabled'
            }`}
            type="submit"
            disabled={!isValid}
          >
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
