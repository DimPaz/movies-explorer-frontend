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
  const [showMovie, setShowMovie] = useState([]);
  // const [saveMovies, setSaveMovies] = useState([]);

  async function saveMoviesCheck(movie, likeFilm) {
    // console.log(movie, likeFilm);
    if (!likeFilm) {
      try {
        await mainApi.delMovie(movie._id);
        const delFilm = await mainApi.getMovies();
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
        // setMovies(data)
        // console.log('Что находоится в юзэфекте', data);
        setShowMovie(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log('showMovie', showMovie);
  return (
    <section className="saved-movies">
      <SearchForm />
      {preloader && <Preloader />}
      {hintText && <div className="movies__hint-text">{hintText}</div>}
      <MoviesCardList movies={showMovie} saveMoviesCheck={saveMoviesCheck} />
    </section>
  );
}
export default SavedMovies;
