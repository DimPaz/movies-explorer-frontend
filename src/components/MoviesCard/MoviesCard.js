import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MoviesCard({ item, saveMovies, saveMoviesCheck }) {
  const { pathname } = useLocation();
  const [saved, setSaved] = useState(false);

  function handleDelBtn() {
    saveMoviesCheck(item, false);
  }

  function handleSaveNotSaveBtn() {
    const newFilm = !saved;
    const saveNewFilm = saveMovies.filter((data) => {
      return data.movieId == item.id;
    });
    saveMoviesCheck(
      { ...item, _id: saveNewFilm.length > 0 ? saveNewFilm[0]._id : null },
      newFilm
    );
  }

  useEffect(() => {
    if (pathname === '/movies') {
      const valueSaveNotSave = saveMovies.find(
        (data) => data.movieId == item.id
      );
      if (valueSaveNotSave) {
        setSaved(true);
      } else {
        setSaved(false);
      }
    }
  }, [pathname, saveMovies, item.id]);

  function convertTime(time) {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <article className="element">
      <a href={item.trailerLink} target="blank">
        <img
          className="element__image"
          src={
            pathname === '/movies'
              ? `https://api.nomoreparties.co${item.image.url}`
              : `${item.image}`
          }
          alt={item.director}
        />
      </a>
      <div className="element__data">
        <h2 className="element__title">{item.nameRU}</h2>
        {pathname === '/saved-movies' ? (
          <button
            className="element__btn element__btn_type_del"
            onClick={handleDelBtn}
            type="button"
          ></button>
        ) : (
          <button
            className={`element__btn ${
              saved ? 'element__btn_type_save' : 'element__btn_type_not-save'
            }`}
            onClick={handleSaveNotSaveBtn}
            type="button"
          ></button>
        )}
      </div>
      <p className="element__time">{convertTime(item.duration)}</p>
    </article>
  );
}

export default MoviesCard;
