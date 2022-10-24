import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';

import { useLocation } from 'react-router-dom';

function MoviesCardList({
  movies,
  allFoundMovies,
  saveMovies,
  saveMoviesCheck,
  addMuviesBtn,
}) {
  const { pathname } = useLocation();

  return (
    <section className="cardlist">
      {movies.length > 0 ? (
        <div className="cardlist__films">
          {movies.map((item) => (
            <MoviesCard
              key={item.id || item.movieId}
              item={item}
              saveMovies={saveMovies}
              saveMoviesCheck={saveMoviesCheck}
            />
          ))}
        </div>
      ) : (
        <div className="cardlist__hint-text">Ничего не найдено</div>
      )}

      {allFoundMovies.length > 0 && pathname === '/movies' ? (
        <button
          className="cardlist__add-muvies-btn"
          onClick={addMuviesBtn}
          type="button"
          name="add"
        >
          Ещё
        </button>
      ) : (
        ''
      )}
    </section>
  );
}
export default MoviesCardList;
