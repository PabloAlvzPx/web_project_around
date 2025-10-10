import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const apiConfig = {
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "05fab9ae-98c7-419d-b69c-20729dd58d6c",
    "Content-Type": "application/json",
  },
};
const api = new Api(apiConfig);

const butEdit = document.querySelector(".main__button_edit");
const butAdd = document.querySelector(".main__button_add");
const butUpdateAvatar = document.querySelector(".main__profile-image-overlay");

const inputName = document.querySelector(".popup__input_name");
const inputAbout = document.querySelector(".popup__input_about");

const formConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId = null;

const userInfo = new UserInfo({
  nameSelector: ".main__paragraph_name",
  aboutSelector: ".main__paragraph_about",
  avatarSelector: ".main__profile-image",
});

const popupImage = new PopupWithImage(".popup_image", ".popup__images");
popupImage.setEventListeners();

const popupConfirmation = new PopupWithConfirmation(".popup_confirm");
popupConfirmation.setEventListeners();

const popupDeleteConfirmation = new PopupWithConfirmation(
  ".popup_type_confirm"
);
popupDeleteConfirmation.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    {
      data,
      userId,
      handleCardClick: (name, link) => {
        popupImage.open(name, link);
      },
      handleDeleteClick: (cardId, cardElement) => {
        popupConfirmation.setSubmitAction(() => {
          popupConfirmation.setLoading(true, "Eliminando...");

          api
            .deleteCard(cardId)
            .then(() => {
              cardElement.remove();
              popupConfirmation.close();
            })
            .catch((err) => {
              console.error("Error al eliminar la tarjeta:", err);
            })
            .finally(() => {
              popupConfirmation.setLoading(false);
            });
        });
        popupConfirmation.open();
      },

      handleLikeClick: (cardId, isLiked) => {
        const likeAction = isLiked
          ? api.removeLike(cardId)
          : api.addLike(cardId);
        likeAction
          .then((res) => {
            card.setLikesCount(res.likes);
          })
          .catch((err) => {
            console.error('Error al manejar el "Me gusta":', err);
          });
      },
    },
    ".main__template"
  );
  return card.generateCard();
};

const cardListSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardListSection.addItem(cardElement);
    },
  },
  ".main__gallery"
);

const popupEditForm = new PopupWithForm(
  ".popup_edit",
  "#formEdit",
  (inputValues) => {
    popupEditForm.setLoading(true);

    api
      .setUserInfo(inputValues.name, inputValues.about)
      .then((res) => {
        userInfo.setUserInfo({ name: res.name, about: res.about });
        popupEditForm.close();
      })
      .catch((err) => {
        console.error("Error al actualizar perfil:", err);
      })
      .finally(() => {
        popupEditForm.setLoading(false);
      });
  }
);
popupEditForm.setEventListeners();

const popupAddForm = new PopupWithForm(".popup", "#formAdd", (inputValues) => {
  popupAddForm.setLoading(true, "Creando...");

  const name = inputValues["title-input"];
  const link = inputValues["url-input"];

  api
    .addCard(name, link)
    .then((newCardData) => {
      const cardElement = createCard(newCardData);

      cardListSection.addItem(cardElement);

      popupAddForm.close();
    })
    .catch((err) => {
      console.error("Error al crear la tarjeta:", err);
    })
    .finally(() => {
      popupAddForm.setLoading(false);
    });
});
popupAddForm.setEventListeners();

const popupAvatarForm = new PopupWithForm(
  ".popup_avatar",
  "#formAvatar",
  (inputValues) => {
    popupAvatarForm.setLoading(true);

    api
      .updateAvatar(inputValues.avatarUrl)
      .then((res) => {
        userInfo.setUserInfo({ avatar: res.avatar });
        popupAvatarForm.close();
      })
      .catch((err) => {
        console.error("Error al actualizar el avatar:", err);
      })
      .finally(() => {
        popupAvatarForm.setLoading(false);
      });
  }
);
popupAvatarForm.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    cardListSection.renderItems(initialCards);
  })
  .catch((err) => {
    console.error("Error al cargar datos iniciales:", err);
  });

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
  inputName.value = userData.name;
  inputAbout.value = userData.about;

  formValidators.formEdit.resetValidation();

  popupEditForm.open();
});

butAdd.addEventListener("click", () => {
  formValidators.formAdd.resetValidation();
  popupAddForm.open();
});

butUpdateAvatar.addEventListener("click", () => {
  formValidators.formAvatar.resetValidation();
  popupAvatarForm.open();
});
