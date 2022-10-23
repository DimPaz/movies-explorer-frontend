import '../Register/Register.css';
import logo from '../../images/logo.svg';

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';

function Register({ onReg, infoTextErrorReg }) {
  const { values, handleChange, error, isValid } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    onReg({
      name: values.name,
      email: values.email,
      password: values.pass,
    });
  }

  return (
    <section className="register">
      <div className="register__contein">
        <Link to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h3 className="register__title">Добро пожаловать!</h3>
        <form className="form" onSubmit={handleSubmit} method="post" noValidate>
          <p className="form__text-field">Имя</p>
          <input
            className="form__input"
            minLength="2"
            maxLength="30"
            required
            type="text"
            placeholder="Имя"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
          />
          <span
            className={`form__error ${error.name ? '' : 'form__error_none'}`}
          >
            {error.name}
          </span>

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
            Ошибка регистрации
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
            Зарегистрироваться
          </button>
          <p className="form__text">
            Уже зарегистрированы?
            <a className="form__link" href="/signin">
              Войти
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
