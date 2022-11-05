/* eslint-disable react-hooks/exhaustive-deps */
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

function Movies({ onSignOut, onInfoTooltip }) {
  const [allMovies, setAllMovies] = useState([]);
  const [showMovie, setShowMovie] = useState([]);
  const [allFoundMovies, setAllFoundMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [statusInputSearch, setStatusInputSearch] = useState('');
  const [statusCheckbox, setStatusCheckbox] = useState(false);

  const [preloader, setPreloader] = useState(true);
  const [hintText, setHintText] = useState('');

  useEffect(() => {
    const localStorageAllMovies = localStorage.getItem('allMovies');
    if (localStorageAllMovies) {
      setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
    } else {
      // запрос фильмов beatfilm-movies
      moviesApi
        .getMovies()
        .then((data) => {
          localStorage.setItem('allMovies', JSON.stringify(data));
          setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
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
    }

    // запрос фильмов которые мы сохранили
    mainApi
      .getMovies()
      .then((data) => {
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
    }, 2500);
  }, []);

  //добавление и удаление картчек
  async function saveMoviesCheck(movie, likeFilm) {
    if (likeFilm) {
      const newFilm = {
        country: movie.country || 'нет информации',
        description: movie.description || 'нет информации',
        director: movie.director || 'нет информации',
        duration: movie.duration,
        movieId: movie.id,
        image:
          `https://api.nomoreparties.co${movie.image.url}` || 'нет информации',
        nameEN: movie.nameEN || 'нет информации',
        nameRU: movie.nameRU || 'нет информации',
        thumbnail:
          `https://api.nomoreparties.co${movie.image.url}` || 'нет информации',
        trailerLink: movie.trailerLink || 'нет информации',
        year: movie.year || 'нет информации',
      };
      mainApi
        .addMovies(newFilm)
        .then((data) => {
          setSaveMovies([data, ...saveMovies]);
        })
        .catch((err) => {
          if (err === '401') {
            onSignOut();
          }
          if (err === '400') {
            onInfoTooltip();
          }
          console.log(err);
        });
    } else {
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
    const DisplayedFromWidth = {
      1279: [12, 4],
      989: [9, 3],
      750: [8, 2],
      480: [5, 2],
    };
    const clientWidth = document.documentElement.clientWidth;
    let numberCards;
    Object.keys(DisplayedFromWidth).forEach((item) => {
      if (clientWidth > +item) {
        numberCards = DisplayedFromWidth[item];
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
