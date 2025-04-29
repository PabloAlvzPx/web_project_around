const popup = document.querySelector(".popup");
const formEd = document.querySelector("#formEdit");
const formAdd = document.querySelector("#formAdd");
const popimg = document.querySelector(".popup__images");

export function openPopup(popupElement) {
  popup.classList.add("popup_opened");
  formEd.classList.add("popup__item-hidden");
  formAdd.classList.add("popup__item-hidden");
  popimg.classList.add("popup__item-hidden");
  popupElement.classList.remove("popup__item-hidden");
}

export function openEditPopup() {
  openPopup(formEd);
}

export function openAddPopup() {
  openPopup(formAdd);
}

export function openImagePopup(name, link) {
  const popimag = popimg.querySelector(".popup__image");
  const poptxt = popimg.querySelector(".popup__paragraph");
  popimag.src = link;
  popimag.alt = name;
  poptxt.textContent = name;
  openPopup(popimg);
}

export function closePopup() {
  popup.classList.remove("popup_opened");
}
