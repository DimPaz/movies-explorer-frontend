import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MoviesCard({ item, saveMovies, saveMoviesCheck }) {
  const { pathname } = useLocation();
  const [saved, setSaved] = useState(false);

  function handleDelBtn() {
    // console.log('handleDelBtn');
    saveMoviesCheck(item, false);
  }
  function handleSaveNotSaveBtn() {
    // console.log('handleSaveNotSaveBtn');
    const newFilm = !saved;
    // console.log('newFilm', newFilm);
    // console.log('saveMovies', saveMovies);
    const saveNewFilm = saveMovies.filter((data) => {
      // console.log('data.movieId', data.movieId, 'item.id', item.id);
      return data.movieId === item.id;
    });
    saveMoviesCheck(
      { ...item, _id: saveNewFilm.length > 0 ? saveNewFilm._id : null },
      newFilm
    );
  }

  useEffect(() => {
    if (pathname === '/movies') {
      // console.log('saveMovies', saveMovies);
      // const valueSaveNotSave = saveMovies.find((data) => {
      //   console.log('data.movieId', data.movieId, 'item.id', item.id);
      //   return data.movieId === item.id;
      // });
      const valueSaveNotSave = saveMovies.find(
        (data) => data.movieId == item.id
      );
      // console.log('valueSaveNotSave =>', valueSaveNotSave);
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
