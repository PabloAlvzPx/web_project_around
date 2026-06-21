export default class Card {
  constructor(
    { data, userId, handleCardClick, handleDeleteClick, handleLikeClick },
    templateSelector,
  ) {
    this._cardId = data._id;
    this._ownerId = data.owner && data.owner._id ? data.owner._id : data.owner;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._currentUserId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".main__gallery-card");
  }

  _getTemplate() {
    return this._template.cloneNode(true);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".main__gallery-image");
    this._cardTitle = this._cardElement.querySelector(
      ".main__gallery-paragraph",
    );
    this._likeButton = this._cardElement.querySelector(".main__button_like");
    this._deleteButton = this._cardElement.querySelector(".main__button_trash");
    this._likeCountElement =
      this._cardElement.querySelector(".main__like-count");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._updateLikeStatus();
    this._toggleDeleteButton();
    this._setEventListeners();

    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _updateLikeStatus() {
    if (this._isLiked) {
      this._likeButton.classList.add("main__button_like_active");
    } else {
      this._likeButton.classList.remove("main__button_like_active");
    }
  }

  _handleLike() {
    this._handleLikeClick(this._cardId, this._isLiked)
      .then((updatedCardData) => {
        this._isLiked = updatedCardData.isLiked;
        this._updateLikeStatus();
      })
      .catch((err) => {
        console.error('Error al manejar el "Me gusta":', err);
      });
  }

  _handleDelete() {
    this._handleDeleteClick(this._cardId, this._cardElement);
  }

  _toggleDeleteButton() {
    this._isOwnCard = this._ownerId === this._currentUserId;
    if (!this._isOwnCard) {
      this._deleteButton.style.display = "none";
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());
    if (this._isOwnCard) {
      this._deleteButton.addEventListener("click", () => this._handleDelete());
    }
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link),
    );
  }
}
