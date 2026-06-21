import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, imageContainerSelector) {
    super(popupSelector);
    this._imageContainer = this._popupElement.querySelector(
      imageContainerSelector,
    );
    this._imageElement = this._imageContainer.querySelector(".popup__image");
    this._captionElement =
      this._imageContainer.querySelector(".popup__paragraph");
  }

  open(name, link) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }

  close() {
    super.close();
  }
}
