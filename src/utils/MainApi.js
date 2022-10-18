const url = 'https://api.dpazuxin.nomoredomains.icu';

class MainApi {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-type': 'application/json',
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Возникла ошибка');
  }

  _addHeader() {
    const token = localStorage.getItem('token');
    return {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
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
    return fetch(`${this._url}/users/me/`, {
      method: 'PATCH',
      headers:  this._addHeader(),
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }


}

const mainApi = new MainApi(url);

export default mainApi;
