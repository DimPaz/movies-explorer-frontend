import './MoviesCard.css';

function MoviesCard({ image, title, duration }) {
  // console.log(image, title, duration);
  return (
    <article className="element">
      <img className="element__image" src={image} alt={title} />
      <div className="element__data">
        <h2 className="element__title">{title}</h2>
        <button className="element__btn" aria-label="AAAAAAAAA!"></button>
      </div>
      <p className="element__time">{duration}</p>
    </article> 
  );
}

export default MoviesCard;
