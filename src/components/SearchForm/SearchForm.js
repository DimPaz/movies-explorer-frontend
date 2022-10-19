import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <input
          className="search-form__form_input"
          placeholder="Фильм"
          name="Search"
          required
        ></input>
        <button className="search-form__form_btn" type="submit">
          Поиск
        </button>
      </form>
      <div className="search-form__checkbox">
        <input className="search-form__checkbox_switch" type="checkbox"></input>
        <p className="search-form__checkbox_text">Короткометражки</p>
      </div>
    </section>
  );
}
export default SearchForm; 
