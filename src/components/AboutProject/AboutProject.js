import './AboutProject.css';

function AboutProject() {
  return ( 
    <section className='about-project'>
    <h3 className='about-project__title'>О проекте</h3>
    <ul className='about-project__plan'>
      <li className='about-project__plan-element'>
        <h4 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h4>
        <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </li>
      <li className='about-project__plan-element'>
        <h4 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h4>
        <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </li>
    </ul>

    <ul className='about-project__chart'>
      <li className='about-project__chart-element'>
        <p className='about-project__period about-project__period_type_back'>1 неделя</p>
        <p className='about-project__develop'>Back-end</p>
      </li>
      <li className='about-project__chart-element'>
        <p className='about-project__period about-project__period_type_front'>4 недели</p>
        <p className='about-project__develop'>Front-end</p>
      </li>
    </ul>
  </section>
  );
}
export default AboutProject;
