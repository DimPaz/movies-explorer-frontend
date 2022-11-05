const url = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
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
          : `Возникла ошибка ${res.status} ${res.statusText}`
      }`
    );
  }

  _addHeader() {
    return {
      'Content-type': 'application/json',
    };
  }

  // запрос фильмов
  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._addHeader(),
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi(url);

export default moviesApi;
