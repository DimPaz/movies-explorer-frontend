import './SavedMovies.css';
import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader.js';

import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi.js';

function SavedMovies() {
  const [preloader, setPrelouder] = useState(false);
  const [hintText, setHintText] = useState('');

  const [movies, setMovies] = useState([]);
  const [moviesCheck, setMoviesCheck] = useState([]);
  const [showMovie, setShowMovie] = useState([]);
  const [showMovieCheck, setShowMovieCheck] = useState([]);

  const [statusInputSearch, setStatusInputSearch] = useState('');
  const [statusCheckbox, setStatusCheckbox] = useState(false);

  function handleCheckbox(check) {
    let foundSaveMovies = [];
    let foundSaveMoviesShowed = [];
    if (check) {
      foundSaveMovies = moviesCheck;
      foundSaveMoviesShowed = showMovieCheck;
    } else {
      setMoviesCheck(movies);
      setShowMovieCheck(showMovie);
      foundSaveMovies = movies.filter(({ duration }) => duration < 41);
      foundSaveMoviesShowed = showMovie.filter(({ duration }) => duration < 41);
    }
    setMovies(foundSaveMovies);
    setShowMovie(foundSaveMoviesShowed);
  }

  async function handleGetMovie(valueSearch, check) {
    localStorage.setItem('searchSavedMovies', valueSearch);
    localStorage.setItem('checkSavedMovies', check);
    try {
      const item = movies;
      console.log(item);
      let foundСards = item.filter(
        ({ nameRU, nameEN, year }) =>
          nameRU.toLowerCase().includes(valueSearch.toLowerCase()) ||
          nameEN.toLowerCase().includes(valueSearch.toLowerCase()) ||
          year.includes(valueSearch)
      );
      if (check)
        foundСards = foundСards.filter(({ duration }) => duration < 41);
      setShowMovie(foundСards);
    } catch (err) {
      setHintText('Нет фильмов');
      setMovies([]);
    }
  }

  async function saveMoviesCheck(movie, likeFilm) {
    if (!likeFilm) {
      try {
        await mainApi.delMovie(movie._id);
        const delFilm = await mainApi.getMovies();
        setMovies(delFilm);
        setShowMovie(delFilm);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        setMovies(data);
        setShowMovie(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //отображаем инпут
    const localStorageSearchSavedMovies =
      localStorage.getItem('searchSavedMovies');
    console.log(localStorageSearchSavedMovies);
    if (localStorageSearchSavedMovies) {
      setStatusInputSearch(localStorageSearchSavedMovies);
    }

    //отображаем чекбокс
    const localStorageCheckSavedMovies =
      localStorage.getItem('checkSavedMovies');
    console.log(localStorageCheckSavedMovies);
    if (localStorageCheckSavedMovies) {
      setStatusCheckbox(localStorageCheckSavedMovies === 'false');
    }
  }, []);

  // console.log('showMovie', showMovie);
  return (
    <section className="saved-movies">
      <SearchForm
        onGetMovie={handleGetMovie}
        statusInputSearch={statusInputSearch}
        onCheckbox={handleCheckbox}
        statusCheckbox={statusCheckbox}
      />
      {preloader && <Preloader />}
      {hintText && <div className="movies__hint-text">{hintText}</div>}
      <MoviesCardList movies={showMovie} saveMoviesCheck={saveMoviesCheck} />
    </section>
  );
}
export default SavedMovies;
