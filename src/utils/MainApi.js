const url = 'https://api.dpazuxin.nomoredomains.icu'; //serv
//const url = 'http://localhost:3000'; //loc

class MainApi {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `${
        res.status === 401
          ? `${res.status}`
          : res.status === 400
          ? `${res.status}`
          : `Возникла ошибка ${res.status} ${res.statusText}`
      }`
    );
  }

  // запрос на регистрацию
  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  // запрос на авторизацию
  authorize(email, password) {
    console.log(email, password);
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._checkResponse);
  }

  // проверка токена
  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  //запрос патч для редактирования name и email
  addUserInfo(name, email) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  // запрос фильмов
  getMovies() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  // запрос на добавление фильмов
  addMovies(movie) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movie),
    }).then(this._checkResponse);
  }

  // запрос на удаление фильмов
  delMovie(id) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi(url);

export default mainApi;
