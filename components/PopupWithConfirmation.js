import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(
      ".popup__form_confirm"
    );
    this._submitButton = this._formElement.querySelector(".popup__button_save");
    this._initialButtonText = this._submitButton.textContent;
  }

  setSubmitAction(action) {
    this._handleSubmitAction = action;
  }

  setLoading(isLoading, loadingText = "Eliminando...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._initialButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmitAction) {
        this._handleSubmitAction();
      }
    });
  }
}
