import './MoviesCardList.css';
import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import Preloader from '../Preloader/Preloader.js';

function MoviesCardList({ movies, addMuviesBtn }) {
  const [loading, setLoading] = useState(false);

  const onPreloader = () => { 
    setLoading(true);
    setTimeout(offPreloader, 1000);
  };
  function offPreloader() {
    setLoading(false);
  }

  return (
    <section className="cardlist">
      <div className="cardlist__films">
        {movies.map((item) => (
          <MoviesCard
            key={item.id}
            image={item.image}
            title={item.title}
            duration={item.duration}
            id={item.id}
          />
        ))}
      </div>

      {loading ? (
        <Preloader />
      ) : (
        addMuviesBtn && (
          <button
            className="cardlist__add-muvies-btn"
            onClick={onPreloader}
            type="button"
            name="add"
          >
            Ещё
          </button>
        )
      )}
    </section>
  );
}
export default MoviesCardList;
