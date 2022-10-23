import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import movies from '../../utils/Movies';

import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

// все фильмы beatfilm-movies
function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [showMovie, setShowMovie] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [statusInputSearch, setStatusInputSearch] = useState('');
  const [statusCheckbox, setStatusCheckbox] = useState(false);

  const [preloader, setPreloader] = useState(true);
  const [hintText, setHintText] = useState('');

  useEffect(() => {
    // запрос фильмов
    moviesApi
      .getMovies()
      .then((data) => {
        localStorage.setItem('allMovies', JSON.stringify(data));
        setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
      })
      .catch((err) => {
        console.log(err);
        setHintText(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      });

    // запрос фильмов которые мы сохранили
    mainApi
      .getMovies()
      .then((data) => {
        setSaveMovies(data);
      })
      .catch((err) => {
        console.log(err);
        setHintText(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      });

    //возвращаем значение инпута
    const localStorageSearch = localStorage.getItem('search');
    if (localStorageSearch) {
      setStatusInputSearch(localStorageSearch);
    }

    //возвращаем положение чекбокса
    const localStorageCheck = localStorage.getItem('localCheck');
    if (localStorageCheck) {
      setStatusCheckbox(localStorageCheck === 'true');
    }

    //возвращаем подсказку
    const localStorageHint = localStorage.getItem('localHintText');
    if (localStorageHint) {
      setHintText(localStorageHint);
    }
    setTimeout(() => {
      setPreloader(false);
    }, 300);
  }, [hintText]);

  //добавление и удаление картчек
  async function saveMoviesCheck(movie, likeFilm) {
    if (likeFilm) {
      const newFilm = {
        country: movie.country || 'нужно загуглить',
        description: movie.description,
        director: movie.director,
        duration: movie.duration,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        movieId: movie.id,
        nameEN: movie.nameEN,
        nameRU: movie.nameRU,
        thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        year: movie.year,
      };
      try {
        await mainApi.addMovies(newFilm);
        const addFilm = await mainApi.getMovies();
        setSaveMovies(addFilm);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await mainApi.delMovie(movie._id);
        const delFilm = await mainApi.getMovies();
        setSaveMovies(delFilm);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (statusCheckbox) {
      const shortСards = allMovies.filter(({ duration }) => duration < 41);
      const shortFoundСards = shortСards.filter(
        ({ nameRU, nameEN, year }) =>
          nameRU.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
          nameEN.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
          year.includes(statusInputSearch)
      );
      setShowMovie(shortFoundСards);
    } else {
      const foundСards = allMovies.filter(
        ({ nameRU, nameEN, year }) =>
          nameRU.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
          nameEN.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
          year.includes(statusInputSearch)
      );
      setShowMovie(foundСards);
    }
  }, [allMovies, statusCheckbox, statusInputSearch]);

  //SearchInput
  function handleGetMovie(valueSearch) {
    if (!valueSearch) {
      setHintText('Нужно ввести ключевое слово');
      localStorage.setItem('localHintText', 'Нужно ввести ключевое слово');
      setShowMovie([]);
      localStorage.setItem('search', '');
    } else {
      setHintText('');
      localStorage.setItem('localHintText', '');
      setStatusInputSearch(valueSearch);
      localStorage.setItem('search', valueSearch);
    }
  }

  //Checkbox
  function handleCheckbox(check) {
    localStorage.setItem('localCheck', check);
    setStatusCheckbox(check);
  }

  return (
    <section className="movies">
      <SearchForm
        onGetMovie={handleGetMovie}
        statusInputSearch={statusInputSearch}
        onCheckbox={handleCheckbox}
        statusCheckbox={statusCheckbox}
      />
      {!hintText && preloader && <Preloader />}
      {hintText && <div className="movies__hint-text">{hintText}</div>}
      {!preloader && !hintText && showMovie !== null && saveMovies !== null && (
        <MoviesCardList
          movies={showMovie}
          saveMovies={saveMovies}
          saveMoviesCheck={saveMoviesCheck}
        />
      )}
    </section>
  );
}
export default Movies;
