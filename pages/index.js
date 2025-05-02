import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const butEdit = document.querySelector(".main__button_edit");
const butAdd = document.querySelector(".main__button_add");

const gallery = document.querySelector(".main__gallery");
const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");
const inpTitle = document.querySelector(".popup__input_title");
const inpUrl = document.querySelector(".popup__input_url");

const initialCards = [
  { name: "Valle de Yosemite", link: "../images/Yosemite.jpg" },
  { name: "Lago Louise", link: "../images/Louise.png" },
  { name: "Montañas Calvas", link: "../images/Calvas.png" },
  { name: "Latemar", link: "../images/Latemar.png" },
  { name: "Vanois National Park", link: "../images/Vanois.png" },
  { name: "Lago di Braies", link: "../images/Braies.png" },
];

const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const userInfo = new UserInfo({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_about",
});

const popupImage = new PopupWithImage(".popup", ".popup__images");
popupImage.setEventListeners();

const cardListSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#main__template", (name, link) => {
        popupImage.open(name, link);
      });
      const cardElement = card.generateCard();
      cardListSection.addItem(cardElement);
    },
  },
  ".main__gallery"
);

cardListSection.renderItems();

const popupEditForm = new PopupWithForm(
  ".popup",
  "#formEdit",
  (inputValues) => {
    userInfo.setUserInfo({
      name: inputValues["name-input"],
      about: inputValues["about-input"],
    });
    popupEditForm.close();
  }
);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(".popup", "#formAdd", (inputValues) => {
  const newCardData = {
    name: inputValues["title-input"],
    link: inputValues["url-input"],
  };
  const card = new Card(newCardData, "#main__template", (name, link) => {
    popupImage.open(name, link);
  });
  const cardElement = card.generateCard();
  cardListSection.addItem(cardElement);
  popupAddForm.close();
});
popupAddForm.setEventListeners();

const formValidators = {};
const formList = Array.from(document.querySelectorAll(formConfig.formSelector));

formList.forEach((formElement) => {
  const validator = new FormValidator(formConfig, formElement);
  const formName = formElement.getAttribute("id");
  formValidators[formName] = validator;
  validator.enableValidation();
});

butEdit.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inpName.value = userData.name;
  inpAbout.value = userData.about;
  popupEditForm.open();
  formValidators["formEdit"].resetValidation();
});

butAdd.addEventListener("click", () => {
  popupAddForm.open();
  formValidators["formAdd"].resetValidation();
});
