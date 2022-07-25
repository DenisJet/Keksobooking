import { isEscEvent } from './util.js';

// Реализация модальных окон

const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const body = document.querySelector('body');

const removeMessage = (message) => {
  document.querySelector(message).remove();
}

// Сообщение об успешном размещении обьявления

const onSuccessMessageEscKeydown = (evt) => {
  if(isEscEvent(evt)) {
    removeMessage('.success');
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }
}

const onDocumentClickRemoveSuccessMessage = () => {
  removeMessage('.success');
  document.removeEventListener('click', onDocumentClickRemoveSuccessMessage);
}

const successMessageShow = () => {
  const successMessage = successMessageTemplate.cloneNode(true);

  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', onDocumentClickRemoveSuccessMessage);

  body.appendChild(successMessage);
}

// Сообщение об ошибке размещения обьявления

const onErrorMessageEscKeydown = (evt) => {
  if(isEscEvent(evt)) {
    removeMessage('.error');
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }
}

const onDocumentClickRemoveErrorMessage = () => {
  removeMessage('.error');
  document.removeEventListener('click', onDocumentClickRemoveErrorMessage);
}

const errorMessageShow = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);

  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onDocumentClickRemoveErrorMessage);

  body.appendChild(errorMessage);
}

export{successMessageShow, errorMessageShow};
