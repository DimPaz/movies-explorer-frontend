import './Promo.css';
import imgLanding from '../../images/landing-logo.svg';

function Promo() {
  return (
    <div className="promo">
      <div className="promo_contein">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <div className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </div>
        <a href="/" className="promo__btn-link">
          Узнать больше
        </a>
      </div>
      <img className="promo__img" src={imgLanding} alt="Планета WEB" />
    </div>
  );
}
export default Promo;
