import '../Register/Register.css';
import logo from '../../images/logo.svg'; 

function Register() {
  return (
    <section className="register">
      <div className="register__contein">
        <a href="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </a>
        <h3 className="register__title">Добро пожаловать!</h3>
        <form className="form" method="post">
          <p className="form__text-field">Имя</p>
          <input className="form__input" type="text" required placeholder="Имя"/>
          <span className="form__error">Неверно заполенно поле</span>

          <p className="form__text-field">E-mail</p>
          <input className="form__input" type="email" required placeholder="E-mail"/>
          <span className="form__error">Неверно заполенно поле</span>

          <p className="form__text-field">Пароль</p>
          <input className="form__input" type="password" required placeholder="password"/>
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
