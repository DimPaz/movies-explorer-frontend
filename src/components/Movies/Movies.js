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
  const [saveMovies, setSaveMovies] = useState([]);
  const [statusCheckbox, setStatusCheckbox] = useState(false);
  const [statusInputSearch, setStatusInputSearch] = useState('');

  const [movies, setMovies] = useState([]);
  const [moviesCheck, setMoviesCheck] = useState([]);
  const [showMovie, setShowMovie] = useState([]);
  const [showMovieCheck, setShowMovieCheck] = useState([]);

  const [preloader, setPrelouder] = useState(false);
  const [hintText, setHintText] = useState('');

  useEffect(() => {
    // запрос фильмов c beatfilm-movies
    moviesApi
      .getMovies()
      .then((data) => {
        // console.log(data);
        localStorage.setItem('allMovies', JSON.stringify(data));
        setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
        // console.log(allMovies)
      })
      .catch((err) => {
        console.log(err);
      });

    // запрос фильмов которые мы сохранили
    mainApi
      .getMovies()
      .then((data) => {
        // console.log('фильм который сохранили =>', data);
        setSaveMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //отображаем карточки
    const localStorageCards = localStorage.getItem('cards');
    if (localStorageCards) {
      const foundСards = JSON.parse(localStorageCards);
      setMovies(foundСards);
      setShowMovie(foundСards);
    }

    //отображаем инпут
    const localStorageSearch = localStorage.getItem('search');
    if (localStorageSearch) {
      setStatusInputSearch(localStorageSearch);
    }

    //отображаем чекбокс
    const localStorageCheck = localStorage.getItem('localCheck');
    if (localStorageCheck) {
      setStatusCheckbox(localStorageCheck === 'false');
    }

    // setPrelouder(false)
  }, []);

  async function saveMoviesCheck(movie, likeFilm) {
    if (likeFilm) {
      // console.log('в компаненте movies', movie, likeFilm)
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
        // console.log(movie.trailerLink)
        await mainApi.addMovies(newFilm);
        const addFilm = await mainApi.getMovies();
        setSaveMovies(addFilm);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        // console.log('в компаненте movies delMovie', movie)
        await mainApi.delMovie(movie._id);
        const delFilm = await mainApi.getMovies();
        setSaveMovies(delFilm);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function handleGetMovie(valueSearch, check) {
    localStorage.setItem('search', valueSearch);
    if (!valueSearch) {
      setHintText('Введите ключевое слово');
      return false;
    }
    setHintText('');

    if (!check) {
      const foundСards = allMovies.filter(
        ({ nameRU, nameEN, year }) =>
          nameRU.toLowerCase().includes(valueSearch.toLowerCase()) ||
          nameEN.toLowerCase().includes(valueSearch.toLowerCase()) ||
          year.includes(valueSearch)
      );

      localStorage.setItem('cards', JSON.stringify(foundСards));
      setMovies(foundСards);
      setShowMovie(foundСards);
      setMoviesCheck(foundСards);
      setShowMovieCheck(foundСards);
    } else {
      const shortСards = allMovies.filter(({ duration }) => duration < 41);
      const shortFoundСards = shortСards.filter(
        ({ nameRU, nameEN, year }) =>
          nameRU.toLowerCase().includes(valueSearch.toLowerCase()) ||
          nameEN.toLowerCase().includes(valueSearch.toLowerCase()) ||
          year.includes(valueSearch)
      );
      localStorage.setItem('cards', JSON.stringify(shortFoundСards));
      setMovies(shortFoundСards);
      setShowMovie(shortFoundСards);
      setMoviesCheck(shortFoundСards);
      setShowMovieCheck(shortFoundСards);
    }
  }

  function handleCheckbox(check) {
    localStorage.setItem('localCheck', check);
    if (movies) {
      let foundMovies = [];
      let foundMoviesShowed = [];
      if (check) {
        foundMovies = moviesCheck;
        foundMoviesShowed = showMovieCheck;
      } else {
        setMoviesCheck(movies);
        setShowMovieCheck(showMovie);
        foundMovies = movies.filter(({ duration }) => duration < 41);
        foundMoviesShowed = showMovie.filter(({ duration }) => duration < 41);
      }
      setMovies(foundMovies);
      setShowMovie(foundMoviesShowed);
    }
  }

  return (
    <section className="movies">
      <SearchForm
        onGetMovie={handleGetMovie}
        statusInputSearch={statusInputSearch}
        onCheckbox={handleCheckbox}
        statusCheckbox={statusCheckbox}
      />
      {preloader && <Preloader />}
      {hintText && <div className="movies__hint-text">{hintText}</div>}
      {!preloader && !hintText && movies !== null && (
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
