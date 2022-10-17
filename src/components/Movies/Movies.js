import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movies from '../../utils/Movies';

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} addMuviesBtn={true}/>
    </section>
  );
}
export default Movies;
