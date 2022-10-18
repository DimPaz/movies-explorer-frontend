import '../Register/Register.css';
import logo from '../../images/logo.svg';

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';

function Register({ onReg }) {
  const { values, handleChange } = useForm({});

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
        <form className="form" onSubmit={handleSubmit} method="post">
          <p className="form__text-field">Имя</p>
          <input
            className="form__input"
            type="text"
            required
            placeholder="Имя"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
          />
          <span className="form__error">Неверно заполенно поле</span>

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
