import './SearchForm.css';

import { useState, useEffect } from 'react';

function SearchForm({
  onGetMovie,
  statusInputSearch,
  onCheckbox,
  statusCheckbox,
}) {
  const [valueSearch, setValueSearch] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    setValueSearch(statusInputSearch);
    setCheckbox(statusCheckbox);
  }, [statusInputSearch, statusCheckbox]);

  function handleSubmit(e) {
    e.preventDefault();
    onGetMovie(valueSearch);
  }

  function handleChange(e) {
    setValueSearch(e.target.value);
  }
  function handleCheckbox() {
    setCheckbox(!checkbox);
    onCheckbox(!checkbox);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" noValidate onSubmit={handleSubmit}>
        <input
          className="search-form__form_input"
          type="text"
          placeholder="Фильм"
          name="search"
          required
          value={valueSearch || ''}
          onChange={handleChange}
        ></input>
        <button className="search-form__form_btn" type="submit">
          Поиск
        </button>
      </form>
      <div className="search-form__checkbox">
        <input
          className="search-form__checkbox_switch"
          type="checkbox"
          value={checkbox}
          checked={!checkbox}
          onChange={handleCheckbox}
          required
        ></input>
        <p className="search-form__checkbox_text">Короткометражки</p>
      </div>
    </section>
  );
}
export default SearchForm;
