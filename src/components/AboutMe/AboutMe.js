import './AboutMe.css';
import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="about-me__title">Студент</h3>
      <div className="about-me__contain">
        <div className="about-me__info">
          <div>
            <h2 className="about-me__name">Дмитрий</h2>
            <p className="about-me__job">Фронтенд-разработчик, 31 год</p>
            <p className="about-me__other">
              Я родился и живу в Нижнем Новогороде, закончил Волжский
              государственный университет. У меня есть жена и две дочки. С 2014
              года работаю в инженеренговой компании ООО «Синтек». На данный
              момент, моя основная работа связана с 2D И 3D графикой, построение
              чертежей для дальнейшей реализации. Увлекся веб-разработкой и
              теперь хочу получить IT-профессию для дальнейшего трудоустройства.
            </p>
          </div>
          <a
            className="about-me__service"
            href="https://github.com/DimPaz"
            target="blank"
          >
            Github
          </a>
        </div>
        <img className="about-me__img" src={photo} alt="Фотография" />
      </div>
    </section>
  );
}
export default AboutMe;
