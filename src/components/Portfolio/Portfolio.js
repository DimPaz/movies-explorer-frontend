import './Portfolio.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__caption"> Портфолио</div>
      <ul className="portfolio__list">
        <li className="portfolio__techs_list">
          <a
            className="portfolio__techs_link"
            href="https://github.com/DimPaz/how-to-learn" 
            target="blank"
          >
            Статичный сайт
          </a>
          <img className="portfolio__img-link" src={arrow} alt="стрелка" />
        </li>
        <li className="portfolio__techs_list">
          <a
            className="portfolio__techs_link"
            href="https://github.com/DimPaz/russian-travel"
            target="blank"
          >
            Адаптивный сайт
          </a>
          <img className="portfolio__img-link" src={arrow} alt="стрелка" />
        </li>
        <li className="portfolio__techs_list">
          <a
            className="portfolio__techs_link"
            href="http://dpazuxin.nomorepartiesxyz.ru"
            target="blank"
          >
            Одностраничное приложение
          </a>

          <img className="portfolio__img-link" src={arrow} alt="стрелка" />
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
