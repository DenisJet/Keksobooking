import { getRandomNumber, getRandomArbitrary } from './util.js';

//создание массива данных

const ADS_COUNT = 10;

const LOCATION_X = {
  min: 35.65000,
  max: 35.70000,
};

const LOCATION_Y = {
  min: 139.70000,
  max: 139.80000,
}

const price = {
  min: 1000,
  max: 10000,
};

const type = ['palace', 'flat', 'house', 'bungalow'];

const typeNumber = {
  min: 0,
  max: 3,
};

const roomsCount = {
  min: 1,
  max: 8,
};

const guestsCount = {
  min: 1,
  max: 16,
};

const checkinTime = ['12:00', '13:00', '14:00'];

const checkoutTime = ['12:00', '13:00', '14:00'];

const FEATURES = [
  'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',
];

const createFeaturesList = () => {
  const featuresList = [];

  for (let i = 0; i < getRandomNumber(1, FEATURES.length); i++) {
    featuresList.push(FEATURES[i]);
  }
  return featuresList;
}

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const createPhotosList = () => {
  const photoList = [];

  for (let i = 0; i < getRandomNumber(1, PHOTOS.length); i++) {
    photoList.push(PHOTOS[i]);
  }
  return photoList;
}

const offers = [];

const createOffers = () => {
  for (let i = 0; i < ADS_COUNT; i++) {
    offers.push({
      author: {
        avatar: `img/avatars/user0${i + 1}.png`,
      },
      offer: {
        title: 'Наше предложение',
        address: `${getRandomArbitrary(LOCATION_X.min, LOCATION_X.max, 5)}, ${getRandomArbitrary(LOCATION_Y.min, LOCATION_Y.max, 5)}`,
        price: getRandomNumber(price.min, price.max),
        type: type[getRandomNumber(typeNumber.min, typeNumber.max)],
        rooms: getRandomNumber(roomsCount.min, roomsCount.max),
        guests: getRandomNumber(guestsCount.min, guestsCount.max),
        checkin: `${checkinTime[getRandomNumber(0, 2)]}`,
        checkout: `${checkoutTime[getRandomNumber(0, 2)]}`,
        features: createFeaturesList(),
        description: 'Потрясающие аппартаменты!!!',
        photos: createPhotosList(),
      },
      location: {
        x: getRandomArbitrary(LOCATION_X.min, LOCATION_X.max, 5),
        y: getRandomArbitrary(LOCATION_Y.min, LOCATION_Y.max, 5),
      },
    })
  }
}

createOffers();

export {offers};
