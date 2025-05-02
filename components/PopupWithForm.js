import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(formSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
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
    this._formElement.classList.remove("popup__item-hidden");
  }

  close() {
    super.close();
    this._formElement.classList.add("popup__item-hidden");
    this._formElement.reset();
  }
}
