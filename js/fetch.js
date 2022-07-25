import {showAlert} from './util.js';
import {createOffersOnMap, setResetMapFilters} from './map.js';
import { successMessageShow, errorMessageShow } from './modals-messages.js';
import { setFormReset } from './form.js';

const OFFERS_ON_MAP_COUNT = 10;

// Получение и отправка данных

let offersData = [];

const getData = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((offers) => {
      offersData = offers.slice();
      createOffersOnMap(offers.slice(0, OFFERS_ON_MAP_COUNT));
    })
    .catch(() => {
      showAlert(
        'Не удалось получить данные c сервера!',
      );
    });
};

const sendData = (formData) => {
  fetch('https://23.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        successMessageShow();
        setFormReset();
        setResetMapFilters();
      } else {
        errorMessageShow();
      }
    })
    .catch(() => {
      errorMessageShow();
    })
}

export { getData, sendData , offersData};
