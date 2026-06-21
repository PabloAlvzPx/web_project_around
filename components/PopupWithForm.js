import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(formSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input"),
    );
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._formElement.querySelector(".popup__button_save");
    if (this._submitButton) {
      this._initialButtonText = this._submitButton.textContent;
    }
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setLoading(isLoading, loadingText = "Guardando...") {
    if (!this._submitButton) return;

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
      this._handleFormSubmit(this._getInputValues());
    });
  }

  open() {
    super.open();
    if (this._submitButton) {
      this._submitButton.textContent = this._initialButtonText;
    }
  }

  close() {
    super.close();
    this._formElement.classList.add("popup__item-hidden");
    this._formElement.reset();
  }
}
