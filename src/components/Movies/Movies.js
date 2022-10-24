/* eslint-disable react-hooks/exhaustive-deps */
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [showMovie, setShowMovie] = useState([]);
  const [allFoundMovies, setAllFoundMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [statusInputSearch, setStatusInputSearch] = useState('');
  const [statusCheckbox, setStatusCheckbox] = useState(false);

  const [preloader, setPreloader] = useState(true);
  const [hintText, setHintText] = useState('');

  useEffect(() => {
    // запрос фильмов beatfilm-movies
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

    // отключаем прелаудер
    setTimeout(() => {
      setPreloader(false);
    }, 500);
  }, []);

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

  // находим короткометражки
  useEffect(() => {
    if (statusCheckbox) {
      const shortСards = allMovies.filter(({ duration }) => duration < 41);
      filterMovies(shortСards);
    } else {
      filterMovies(allMovies);
    }
  }, [allMovies, statusCheckbox, statusInputSearch]);

  //фильтр фильмов
  function filterMovies(cards) {
    const foundСards = cards.filter(
      ({ nameRU, nameEN, year }) =>
        nameRU.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
        nameEN.toLowerCase().includes(statusInputSearch.toLowerCase()) ||
        year.includes(statusInputSearch)
    );
    setShowMovie(foundСards.splice(0, getCalcCards()[0]));
    setAllFoundMovies(foundСards);
  }

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

  // расчет количества карточек относительно ширины
  function getCalcCards() {
    const displayedFromWidth = {
      1279: [12, 4],
      989: [9, 3],
      750: [8, 2],
      480: [5, 2],
    };
    const clientWidth = document.documentElement.clientWidth;
    let numberCards;
    Object.keys(displayedFromWidth).forEach((item) => {
      if (clientWidth > +item) {
        numberCards = displayedFromWidth[item];
      }
    });
    return numberCards;
  }

  // кнопка ещё
  function addMuviesBtn() {
    setShowMovie(showMovie.concat(allFoundMovies.splice(0, getCalcCards()[1])));
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
          allFoundMovies={allFoundMovies}
          saveMovies={saveMovies}
          saveMoviesCheck={saveMoviesCheck}
          addMuviesBtn={addMuviesBtn}
        />
      )}
    </section>
  );
}
export default Movies;
