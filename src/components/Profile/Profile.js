import '../Profile/Profile.css';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onSignOut, onUpdateUser, infoText }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameNew, setNameNew] = useState(currentUser.name);
  const [emailNew, setEmailNew] = useState(currentUser.email);
  const [inactiveBtm, setInactiveBtm] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setInactiveBtm(false);
  }, [currentUser.email, currentUser.name]);

  function handleChangeName(e) {
    const inputName = e.target.value;
    setNameNew(inputName);

    if (inputName !== name) {
      setInactiveBtm(true);
    } else {
      setInactiveBtm(false);
    }
  }

  function handleChangeEmail(e) {
    const inputEmail = e.target.value;
    setEmailNew(inputEmail);

    if (inputEmail !== email) {
      setInactiveBtm(true);
    } else {
      setInactiveBtm(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: nameNew,
      email: emailNew,
    });
  }

  function signOut() {
    onSignOut();
  }

  return (
    <section className="profile">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-form__contein">
          <h3 className="profile-form__title">{`Привет, ${name}!`}</h3>

          <div className="profile-form__items">
            <p className="profile-form__items_text">Имя</p>
            <input
              className="profile-form__items_input"
              type="text"
              name="nameNew"
              minLength="2"
              maxLength="30"
              value={nameNew}
              onChange={handleChangeName}
            />
          </div>
          <div className="profile-form__items">
            <p className="profile-form__items_text">E-mail</p>
            <input
              className="profile-form__items_input"
              type="email"
              name="emailNew"
              value={emailNew}
              onChange={handleChangeEmail}
            />
          </div>
          <span className="profile-form__massege">{infoText}</span>
          <button
            className="profile-form__submit"
            type="submit"
            disabled={!inactiveBtm}
          >
            Редактировать
          </button>
          <button
            onClick={signOut}
            className="profile-form__exit-btn"
            type="button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
