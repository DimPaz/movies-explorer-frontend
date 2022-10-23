import { useState, useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import mainApi from '../../utils/MainApi.js';

import './App.css';

function App() {
  const { pathname } = useLocation();
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoText, setInfoText] = useState(null);
  const [infoTextErrorReg, setInfoTextErrorReg] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, []);

  // Регистрация
  function handleReg({ name, email, password }) {
    mainApi
      .register(name, email, password)
      .then((user) => {
        if (user) {
          console.log('успешная регистрация', user);
          handleLogin({ email: user.email, password });
        }
      })
      .catch(
        setTimeout(() => {
          setInfoTextErrorReg(true);
        }, 700)
      )
      .finally(
        setTimeout(() => {
          setInfoTextErrorReg(false);
        }, 2500)
      );
  }

  // авторизация
  function handleLogin({ email, password }) {
    console.log(email, password);
    mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          tokenCheck();
          setLoggedIn(true);
          history.push('/movies');
          console.log('успешная авторизация');
        } else {
          setTimeout(() => {
            setInfoTextErrorReg(true);
          }, 700);
        }
      })
      .catch((err) => console.log('Ошибка авторизации', err))
      .finally(
        setTimeout(() => {
          setInfoTextErrorReg(false);
        }, 2500)
      );
  }

  // проверка токена
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          localStorage.removeItem('token');
          console.log('Ошибка токена ', err);
        });
    }
  }
  //редактирование name и email
  function handleUpdateUser({ name, email }) {
    mainApi
      .addUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setInfoText('Данные сохранены успешно');
        setTimeout(() => {
          setInfoText('');
        }, 2000);
      })
      .catch((err) => {
        setInfoText('Данные не сохранены');
        setTimeout(() => {
          setInfoText('');
        }, 2000);
        console.log(err);
      });
  }

  // выход из системы
  function handleSignOut() {
    localStorage.removeItem('token');
    history.push('/');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies' ||
        pathname === '/profile' ? (
          <Header loggedIn={loggedIn} />
        ) : (
          ''
        )}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/signup">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register onReg={handleReg} infoTextErrorReg={infoTextErrorReg} />
            )}
          </Route>

          <Route exact path="/signin">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login
                onLogin={handleLogin}
                infoTextErrorReg={infoTextErrorReg}
              />
            )}
          </Route>
          <ProtectedRoute
            exact
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
            onUpdateUser={handleUpdateUser}
            infoText={infoText}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
          />
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies' ? (
          <Footer />
        ) : (
          ''
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
