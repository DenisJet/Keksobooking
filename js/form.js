import { sendData } from './fetch.js';
import { mainPinMarker } from './map.js';

// Форма подачи обьявления

const HOUSING_TYPE = ['bungalow', 'flat', 'hotel', 'house', 'palace'];
const HOUSING_PRICE = [0, 1000, 3000, 5000, 10000];

const form = document.querySelector('.ad-form');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const timein = form.querySelector('#timein');
const timeout = form.querySelector('#timeout');
const avatarPreview = form.querySelector('.ad-form-header__preview img');

// Изменение минимальной цены и plaseholder поля ввода цены

type.addEventListener('change', () => {
  for (let i = 0; i < HOUSING_TYPE.length; i++) {
    if (type.value == HOUSING_TYPE[i]) {
      price.placeholder = HOUSING_PRICE[i];
      price.min = HOUSING_PRICE[i];
    }
  }
});

// Синхронизация полей ввода: время заезда и время выезда

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

// Сброс формы

const setFormReset = () => {
  form.reset();
  mainPinMarker.setLatLng({lat: 35.68853, lng: 139.76120});
  avatarPreview.src = 'img/muffin-grey.svg';

  const imagesContainer = form.querySelector('.ad-form__photo');

  if(imagesContainer.querySelector('img')) {
    while (imagesContainer.firstChild) {
      imagesContainer.removeChild(imagesContainer.firstChild);
    }
  }
};

// Отправка формы

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(formData);
});

export {setFormReset};
