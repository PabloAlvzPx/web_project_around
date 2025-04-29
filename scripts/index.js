import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openEditPopup,
  openAddPopup,
  openImagePopup,
  closePopup,
} from "./utils.js";

const butEdit = document.querySelector(".main__button_edit");
const butAdd = document.querySelector(".main__button_add");
const butClose = document.querySelector(".popup__button_close");
const popup = document.querySelector(".popup");
const formEd = document.querySelector("#formEdit");
const formAdd = document.querySelector("#formAdd");
const popimg = document.querySelector(".popup__images");
const gallery = document.querySelector(".main__gallery");
const paragName = document.querySelector(".main__paragraph_name");
const paragAbout = document.querySelector(".main__paragraph_about");
const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");
const inpTitle = document.querySelector(".popup__input_title");
const inpUrl = document.querySelector(".popup__input_url");

const initialCards = [
  { name: "Valle de Yosemite", link: "./images/Yosemite.jpg" },
  { name: "Lago Louise", link: "./images/Louise.png" },
  { name: "Montañas Calvas", link: "./images/Calvas.png" },
  { name: "Latemar", link: "./images/latemar.png" },
  { name: "Vanois National Park", link: "./images/Vanois.png" },
  { name: "Lago di Braies", link: "./images/Braies.png" },
];

const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function createCard(item) {
  const card = new Card(item, "#main__template", handleCardClick);
  return card.generateCard();
}

function renderInitialCards() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    gallery.append(cardElement);
  });
}

function handleCardClick(name, link) {
  openImagePopup(name, link);
}

function saveChangeEdit() {
  paragName.textContent = inpName.value;
  paragAbout.textContent = inpAbout.value;
  closePopup();
}

function saveCard() {
  const newCardData = { name: inpTitle.value, link: inpUrl.value };
  const newCardElement = createCard(newCardData);
  gallery.prepend(newCardElement);
  formAdd.reset();
  formValidators["formAdd"].resetValidation();
  closePopup();
}

butEdit.addEventListener("click", openEditPopup);
butAdd.addEventListener("click", openAddPopup);
butClose.addEventListener("click", closePopup);

formEd.addEventListener("submit", (e) => {
  e.preventDefault();
  saveChangeEdit();
});

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  saveCard();
});

formEd.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    saveChangeEdit();
  }
});

formAdd.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    saveCard();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup();
  }
});

document.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopup();
  }
});

renderInitialCards();

const formValidators = {};
const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
formList.forEach((form) => {
  const validator = new FormValidator(formConfig, form);
  const formName = form.getAttribute("id");
  formValidators[formName] = validator;
  validator.enableValidation();
});
