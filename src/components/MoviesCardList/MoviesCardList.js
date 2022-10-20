import './MoviesCardList.css';
import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';

import { useLocation } from 'react-router-dom';

function MoviesCardList({
  movies,
  addMuviesBtn,
  // addMovies,
  saveMovies,
  saveMoviesCheck,
}) {
  const { pathname } = useLocation();

  // console.log('в мувикардлист', saveMovies);
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
        <div className="cardlist__hint-text">нет фильмов</div>
      )}

      {/* {addMovies.length > 0 && pathname === '/movies' ? ( */}
      {movies.length > 0 && pathname === '/movies' ? (
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
