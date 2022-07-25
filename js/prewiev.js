const getPopupType = (type) => {
  return type === 'palace' ? 'Дворец' : type === 'flat' ? 'Квартира' : type === 'house' ? 'Дом' : 'Бунгало';
}

const getPopupFeatures = (features, parentDiv) => {
  if (features) {
    const featuresListContainer = parentDiv.querySelector('.popup__features');
    const feature = featuresListContainer.querySelector('.popup__feature');

    while (featuresListContainer.firstChild) {
      featuresListContainer.firstChild.remove();
    }

    features.forEach((el) => {
      const newFeature = feature.cloneNode(true);
      newFeature.className = `popup__feature popup__feature--${el}`;
      featuresListContainer.appendChild(newFeature);
    });
  }
}

const getPopupPhotos = (photos, parentDiv) => {
  if (photos) {
    const imageContainer = parentDiv.querySelector('.popup__photos');
    const image = imageContainer.querySelector('img');
    imageContainer.removeChild(image);

    photos.forEach((photo) => {
      const newPhoto = image.cloneNode(true);
      newPhoto.src = photo;
      imageContainer.appendChild(newPhoto);
    });
  }
};

const createCardPopup = (card) => {
  const cardPopupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const newCardPopup = cardPopupTemplate.cloneNode(true);

  newCardPopup.querySelector('.popup__title').textContent = card.offer.title;
  newCardPopup.querySelector('.popup__text--address').textContent = card.offer.address;
  newCardPopup.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  newCardPopup.querySelector('.popup__type').textContent = getPopupType(card.offer.type);
  newCardPopup.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  newCardPopup.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  getPopupFeatures(card.offer.features, newCardPopup);
  newCardPopup.querySelector('.popup__description').textContent = card.offer.description;
  getPopupPhotos(card.offer.photos, newCardPopup);
  newCardPopup.querySelector('.popup__avatar').src = card.author.avatar;

  return newCardPopup;
}

export {createCardPopup, getPopupType};
