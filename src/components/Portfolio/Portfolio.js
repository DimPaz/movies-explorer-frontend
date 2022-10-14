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
          <a
            className="portfolio__techs_link"
            href="https://github.com/DimPaz/how-to-learn"
            target="blank"
          >
            <img className="portfolio__img-link" src={arrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__techs_list">
          <a
            className="portfolio__techs_link"
            href="https://github.com/DimPaz/russian-travel"
            target="blank"
          >
            Адаптивный сайт
          </a>
          <a
            className="portfolio__techs_link"
            href="https://github.com/DimPaz/russian-travel"
            target="blank"
          >
            <img className="portfolio__img-link" src={arrow} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__techs_list">
          <a
            className="portfolio__techs_link"
            href="http://dpazuxin.nomorepartiesxyz.ru"
            target="blank"
          >
            Одностраничное приложение
          </a>
          <a
            className="portfolio__techs_link"
            href="http://dpazuxin.nomorepartiesxyz.ru"
            target="blank"
          >
            <img className="portfolio__img-link" src={arrow} alt="стрелка" />
          </a>
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
