import './SavedMovies.css';
import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi.js';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies() {
  const [showMovie, setShowMovie] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [statusInputSearch, setStatusInputSearch] = useState('');
  const [statusCheckbox, setStatusCheckbox] = useState(false);

  const [preloader, setPreloader] = useState(true);
  const [hintText, setHintText] = useState('');

  useEffect(() => {
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
    const localStorageSearchSavedMovies =
      localStorage.getItem('searchSavedMovies');
    if (localStorageSearchSavedMovies) {
      setStatusInputSearch(localStorageSearchSavedMovies);
    }

    //возвращаем положение чекбокса
    const localStorageCheckSavedMovies =
      localStorage.getItem('checkSavedMovies');
    if (localStorageCheckSavedMovies) {
      setStatusCheckbox(localStorageCheckSavedMovies === 'true');
    }

    //возвращаем подсказку
    const localStorageHintSaveMovies = localStorage.getItem(
      'localHintTextSaveMovies'
    );
    if (localStorageHintSaveMovies) {
      setHintText(localStorageHintSaveMovies);
    }
    setTimeout(() => {
      setPreloader(false);
    }, 300);
  }, []);

  //удаление карточек
  async function saveMoviesCheck(movie, likeFilm) {
    if (!likeFilm) {
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
      const shortСards = saveMovies.filter(({ duration }) => duration < 41);
      const shortFoundСards = shortСards.filter(
        ({ nameRU, nameEN, year }) =>
          nameRU.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
          nameEN.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
          year.includes(statusInputSearch)
      );
      setShowMovie(shortFoundСards);
    } else {
      const foundСards = saveMovies.filter(
        ({ nameRU, nameEN, year }) =>
          nameRU.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
          nameEN.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
          year.includes(statusInputSearch)
      );
      setShowMovie(foundСards);
    }
  }, [saveMovies, statusCheckbox, statusInputSearch]);

  //SearchInput
  function handleGetMovie(valueSearch) {
    if (!valueSearch) {
      setHintText('Нужно ввести ключевое слово');
      localStorage.setItem(
        'localHintTextSaveMovies',
        'Нужно ввести ключевое слово'
      );
      setShowMovie([]);
      localStorage.setItem('searchSavedMovies', '');
    } else {
      setHintText('');
      localStorage.setItem('localHintTextSaveMovies', '');
      setStatusInputSearch(valueSearch);
      localStorage.setItem('searchSavedMovies', valueSearch);
    }
  }

  //Checkbox
  function handleCheckbox(check) {
    localStorage.setItem('checkSavedMovies', check);
    setStatusCheckbox(check);
  }

  return (
    <section className="saved-movies">
      <SearchForm
        onGetMovie={handleGetMovie}
        statusInputSearch={statusInputSearch}
        onCheckbox={handleCheckbox}
        statusCheckbox={statusCheckbox}
      />
      {!hintText && preloader && <Preloader />}
      {hintText && <div className="movies__hint-text">{hintText}</div>}
      {!preloader && !hintText && showMovie !== null && saveMovies !== null && (
        <MoviesCardList movies={showMovie} saveMoviesCheck={saveMoviesCheck} />
      )}
    </section>
  );
}
export default SavedMovies;
