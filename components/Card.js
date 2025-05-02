export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = document
      .querySelector(templateSelector)
      .content.querySelector(".main__gallery-card");
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return this._template.cloneNode(true);
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("main__button_like_active");
  }

  _handleDeleteClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".main__button_like");
    this._deleteButton = this._cardElement.querySelector(".main__button_trash");
    this._cardImage = this._cardElement.querySelector(".main__gallery-image");

    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick()
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".main__gallery-image");
    this._cardTitle = this._cardElement.querySelector(
      ".main__gallery-paragraph"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
