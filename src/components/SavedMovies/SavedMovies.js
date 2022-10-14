import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import savedMovies from '../../utils/savedMovies';

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList movies={savedMovies} buttonMore={false} />
    </section>
  );
}
export default SavedMovies;
