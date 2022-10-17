import '../Profile/Profile.css';

function Profile() {
  return (
    <section className="profile">
      <form className="profile-form">
        <div className="profile-form__contein">
          <h3 className="profile-form__title">Привет, пользователь!</h3>

          <div className="profile-form__items">
            <p className="profile-form__items_text">Имя</p>
            <input
              className="profile-form__items_input"
              type="text"
              placeholder="пользователь"
            />
          </div>
          <div className="profile-form__items">
            <p className="profile-form__items_text">E-mail</p>
            <input
              className="profile-form__items_input"
              type="email"
              placeholder="pochta@yandex.ru"
            />
          </div>

          <button className="profile-form__submit" type="submit">
            Редактировать
          </button>
          <a href="/" className="profile-form__link">
            Выйти из аккаунта
          </a>
        </div>
      </form>
    </section>
  );
}

export default Profile;
