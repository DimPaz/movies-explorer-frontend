import './SavedMovies.css';
import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';

import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi.js';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies({ onSignOut }) {
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
        setShowMovie(data);
        setSaveMovies(data);
      })
      .catch((err) => {
        if (err === '401') {
          onSignOut();
        }
        console.log(err);
        setHintText(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
      });

    //возвращаем положение чекбокса
    const localStorageCheckSavedMovies =
      localStorage.getItem('checkSavedMovies');
    if (localStorageCheckSavedMovies) {
      setStatusCheckbox(localStorageCheckSavedMovies === 'true');
    }

    // отключаем прелаудер
    setTimeout(() => {
      setPreloader(false);
    }, 1000);
  }, [onSignOut]);

  //удаление карточек
  function saveMoviesCheck(movie, likeFilm) {
    if (!likeFilm) {
      mainApi
        .delMovie(movie._id)
        .then(({ data }) => {
          const delFilm = saveMovies.filter((n) => n._id !== data._id);
          setSaveMovies(delFilm);
        })
        .catch((err) => {
          if (err === '401') {
            onSignOut();
          }
          console.log(err);
        });
    }
  }

  // находим короткометражки
  useEffect(() => {
    if (statusCheckbox) {
      const shortСards = saveMovies.filter(({ duration }) => duration < 41);
      filterMovies(shortСards);
    } else {
      filterMovies(saveMovies);
    }
  }, [saveMovies, statusCheckbox, statusInputSearch]);

  //фильтр фильмов
  function filterMovies(cards) {
    const foundСards = cards.filter(
      ({ nameRU, nameEN, year }) =>
        nameRU.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
        nameEN.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
        year.includes(statusInputSearch)
    );
    setShowMovie(foundСards);
  }

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
        <MoviesCardList
          movies={showMovie}
          saveMoviesCheck={saveMoviesCheck}
          allFoundMovies={0}
        />
      )}
    </section>
  );
}
export default SavedMovies;
