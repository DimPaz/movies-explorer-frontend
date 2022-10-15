import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MoviesCard({ image, title, duration, id }) {
  const { pathname } = useLocation();
  const [saved, setSaved] = useState(false);

  // знаю, что жестко захардкодил
  // как я понял, нужно просто визуал реализовать на данном этапе
  // потом всё придется допиливать
  useEffect(() => {
    if (id < 1000) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [id]);

  return (
    <article className="element">
      <img className="element__image" src={image} alt={title} />
      <div className="element__data">
        <h2 className="element__title">{title}</h2>
        {pathname === '/saved-movies' ? (
          <button
            className="element__btn element__btn_type_del"
            type="button"
          ></button>
        ) : (
          <button
            className={`element__btn ${
              saved ? 'element__btn_type_save' : 'element__btn_type_not-save'
            }`}
            type="button"
          ></button>
        )}
      </div>
      <p className="element__time">{duration}</p>
    </article>
  );
}

export default MoviesCard;
