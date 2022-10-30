import './PageNotFound.css';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();

  console.log('PageNotFound');
  return (
    <section className="page-not-found">
      <div>
        <h2 className="page-not-found__title">404</h2>
        <p className="page-not-found__text">Страница не найдена</p>
      </div>
      <button
        className="page-not-found__exit-btn"
        onClick={() => history.goBack()}
      >
        Назад
      </button>
    </section>
  );
}
export default PageNotFound;
