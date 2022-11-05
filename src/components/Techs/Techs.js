import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <h3 className="techs__title">Технологии</h3>
      <div className="techs__content">
        <h2 className="techs__heading">7 технологий</h2>
        <div className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </div>
        <ul className="techs__list">
          <li className="techs__list_text">HTML</li>
          <li className="techs__list_text">CSS</li>
          <li className="techs__list_text">JS</li>
          <li className="techs__list_text">React</li>
          <li className="techs__list_text">Git</li>
          <li className="techs__list_text">Express.js</li>
          <li className="techs__list_text">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
export default Techs;
