/* global L:readonly */

import {createCardPopup} from './prewiev.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersFieldset = mapFilters.querySelector('fieldset');
const mapFiltersSelectsAll = mapFilters.querySelectorAll('select');
const form = document.querySelector('.ad-form');
const formFieldsetsAll = form.querySelectorAll('fieldset');
const address = form.querySelector('#address');

//НЕактивное (изначальное состояние формы и фильтра карты)

mapFilters.classList.add('map__filters--disabled');
mapFiltersFieldset.setAttribute('disabled', 'disabled');

mapFiltersSelectsAll.forEach((select) => {
  select.setAttribute('disabled', 'disabled');
});

form.classList.add('ad-form--disabled');

formFieldsetsAll.forEach((fieldset) => {
  fieldset.setAttribute('disabled', 'disabled');
});

//Загрузка карты

const map = L.map('map-canvas')
  .on('load', () => {                                // переход формы в активное состояние
    mapFilters.classList.remove('map__filters--disabled');
    mapFiltersFieldset.removeAttribute('disabled');

    mapFiltersSelectsAll.forEach((select) => {
      select.removeAttribute('disabled');
    });

    form.classList.remove('ad-form--disabled');

    formFieldsetsAll.forEach((fieldset) => {
      fieldset.removeAttribute('disabled');
    });
  })
  .setView(
    {
      // начальная позиция карты
      lat: 35.68853,
      lng: 139.76120,
    },
    10,
  );

L.tileLayer(
  // подключение карты
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Главный маркер

const mainPinIcon = L.icon({
  iconUrl: '/leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68853,
    lng: 139.76120,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {     // синхронизация координат положения главного маркера и поля ввода адреса
  let coordinates = evt.target.getLatLng();
  address.value = `${coordinates['lat'].toFixed(5)}, ${coordinates[
    'lng'
  ].toFixed(5)}`;
});

// Метки обьявлений

let markers = [];

const createOffersOnMap = (offers) => {
  removeMarkers();

  offers.forEach((offer) => {
    const icon = L.icon({
      iconUrl: '/leaflet/img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon,
      },
    );

    markers.push(marker);

    marker.addTo(map).bindPopup(createCardPopup(offer));
  });
}

const removeMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  })
}

//Сброс фильтров карты

const setResetMapFilters = () => {
  mapFilters.reset();
}

export {createOffersOnMap, mainPinMarker, setResetMapFilters};
