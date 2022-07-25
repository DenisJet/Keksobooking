// Валидация формы

const TITLE_MIN_LENGTH = 30;

const titleInput = document.querySelector('#title');
const roomsAmountInpit = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');

const onOfferTitleInputValidation = () => {
  if (titleInput.value.length < TITLE_MIN_LENGTH) {
    titleInput.setCustomValidity('Длинна заголовка не менее 30 символов');
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
}

const onRoomsAmountInputValidation = () => {
  if (roomsAmountInpit.value == 1 && (capacityInput.value == 2 || capacityInput.value == 3 || capacityInput.value == 0)) {
    capacityInput.setCustomValidity('Недопустимое количество мест');
  } else if (roomsAmountInpit.value == 2 && (capacityInput.value == 3 || capacityInput.value == 0)) {
    capacityInput.setCustomValidity('Недопустимое количество мест');
  } else if (roomsAmountInpit.value == 3 && capacityInput.value == 0) {
    capacityInput.setCustomValidity('Недопустимое количество мест');
  } else if (roomsAmountInpit.value == 100 &&(capacityInput.value == 1 || capacityInput.value == 2 || capacityInput.value == 3)) {
    capacityInput.setCustomValidity('Недопустимое количество мест');
  } else {
    capacityInput.setCustomValidity('');
  }

  capacityInput.reportValidity();
}


titleInput.addEventListener('input', onOfferTitleInputValidation);
capacityInput.addEventListener('change', onRoomsAmountInputValidation);
roomsAmountInpit.addEventListener('change', onRoomsAmountInputValidation);

