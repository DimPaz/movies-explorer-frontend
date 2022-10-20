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
  }, []);
  // console.log(allMovies)

  async function saveMoviesCheck(movie, likeFilm) {
    if (likeFilm) {
      // console.log('в компаненте movies', likeFilm)
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

  return (
    <section className="movies">
      <SearchForm />
      {preloader && <Preloader />}
      {hintText && <div className="movies__hint-text">{hintText}</div>}
      {!preloader && !hintText && (
        <MoviesCardList
          movies={allMovies}
          saveMovies={saveMovies}
          saveMoviesCheck={saveMoviesCheck}
        />
      )}
    </section>
  );
}
export default Movies;
