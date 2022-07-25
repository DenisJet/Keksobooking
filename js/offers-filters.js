import { offersData } from './fetch.js';
import { createOffersOnMap } from './map.js';

const OFFERS_ON_MAP_COUNT = 10;
const RERENDER_DELAY = 500;

// Фильтрация обьявлений на карте

const mapFiltersForm = document.querySelector('.map__filters');
const typeElement = mapFiltersForm.querySelector('#housing-type');
const priceElement = mapFiltersForm.querySelector('#housing-price');
const roomsElement = mapFiltersForm.querySelector('#housing-rooms');
const guestsElement = mapFiltersForm.querySelector('#housing-guests');
const featuresElement = mapFiltersForm.querySelector('#housing-features');
const featuresElementList = featuresElement.querySelectorAll('.map__checkbox');

const getSimilarTypeOffers = (offers) => {
  let similarTypeOffers;

  if (typeElement.value == 'any') {
    similarTypeOffers = offers;
  } else {
    similarTypeOffers = offers.filter(
      (offer) => offer.offer.type == typeElement.value,
    );
  }

  return similarTypeOffers;
};

const getSimilarPriceOffers = (offers) => {
  let similarPriceOffers;

  if (priceElement.value == 'low') {
    similarPriceOffers = getSimilarTypeOffers(offers).filter(
      (offer) => offer.offer.price < 10000,
    );
  } else if (priceElement.value == 'high') {
    similarPriceOffers = getSimilarTypeOffers(offers).filter(
      (offer) => offer.offer.price > 50000,
    );
  } else if (priceElement.value == 'any') {
    similarPriceOffers = getSimilarTypeOffers(offers);
  } else {
    similarPriceOffers = getSimilarTypeOffers(offers).filter(
      (offer) => offer.offer.price > 10000 && offer.offer.price < 50000,
    );
  }

  return similarPriceOffers;
};

const getSimilarRoomsOffers = (offers) => {
  let similarRoomsOffers;

  if (roomsElement.value == 'any') {
    similarRoomsOffers = getSimilarPriceOffers(offers);
  } else if (roomsElement.value == '1') {
    similarRoomsOffers = getSimilarPriceOffers(offers).filter(
      (offer) => offer.offer.rooms == 1,
    );
  } else if (roomsElement.value == '2') {
    similarRoomsOffers = getSimilarPriceOffers(offers).filter(
      (offer) => offer.offer.rooms == 2,
    );
  } else if (roomsElement.value == '3') {
    similarRoomsOffers = getSimilarPriceOffers(offers).filter(
      (offer) => offer.offer.rooms == 3,
    );
  }

  return similarRoomsOffers;
};

const getSimilarGuestsOffers = (offers) => {
  let similarGuestsOffers;

  if (guestsElement.value == 'any') {
    similarGuestsOffers = getSimilarRoomsOffers(offers);
  } else if (guestsElement.value == '1') {
    similarGuestsOffers = getSimilarRoomsOffers(offers).filter(
      (offer) => offer.offer.guests == 1,
    );
  } else if (guestsElement.value == '2') {
    similarGuestsOffers = getSimilarRoomsOffers(offers).filter(
      (offer) => offer.offer.guests == 2,
    );
  } else if (guestsElement.value == '0') {
    similarGuestsOffers = getSimilarRoomsOffers(offers).filter(
      (offer) => offer.offer.guests == 0,
    );
  }

  return similarGuestsOffers;
};

const getSimilarFeatures = (offers) => {
  let similarFeaturesOffers = [];
  let newFeatures = [];

  featuresElementList.forEach((element) => {
    if (element.checked) {
      newFeatures.push(element.value);
    }
  });

  getSimilarGuestsOffers(offers).forEach((offer) => {
    let similarFeaturesCount = 0;

    if(offer.offer.features) {
      for (let i = 0; i < offer.offer.features.length; i++) {
        for(let j = 0; j < newFeatures.length; j++) {
          if(offer.offer.features[i] == newFeatures[j]) {
            similarFeaturesCount++;
          }
        }
      }

      if(similarFeaturesCount == newFeatures.length) {
        similarFeaturesOffers.push(offer);
      }
    }
  });

  return similarFeaturesOffers;
};

const createSimilarOffers = (offers) => {
  createOffersOnMap(
    getSimilarFeatures(offers).slice(0, OFFERS_ON_MAP_COUNT),
  );
};

const onChangeMapFilterElement = () => {
  createSimilarOffers(offersData);
};

const debounce = (callback, delay) => {
  let timeout;

  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

typeElement.addEventListener('change', onChangeMapFilterElement);
priceElement.addEventListener('change', onChangeMapFilterElement);
roomsElement.addEventListener('change', onChangeMapFilterElement);
guestsElement.addEventListener('change', onChangeMapFilterElement);
featuresElement.addEventListener('change', debounce(onChangeMapFilterElement, RERENDER_DELAY));
