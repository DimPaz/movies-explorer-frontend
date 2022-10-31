import './InfoTooltip.css';

function InfoTooltip({ isOpen, onClose }) {
  function closePopupOnOverlay(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div
        className="popup__container"
        onClick={(event) => closePopupOnOverlay(event)}
      >
        <div className="popup__info-tooltip">
          <button
            className={`popup__close-btn`}
            type="button"
            onClick={onClose}
          ></button>
          <h3 className="popup__title">Произошла ошибка</h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
