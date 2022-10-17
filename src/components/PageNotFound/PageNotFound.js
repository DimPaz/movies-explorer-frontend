import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className="page-not-found">
      <div>
        <h2 className="page-not-found__title">404</h2>
        <p className="page-not-found__text">Страница не найдена</p>
      </div>
      <Link to="/" className="page-not-found__exit-btn">
        Назад
      </Link>
    </section>
  );
}
export default PageNotFound;
