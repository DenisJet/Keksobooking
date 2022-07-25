// Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomNumber = (firstNumber, lastNumber) => {
  if (firstNumber < 0 || lastNumber < 0 || firstNumber >= lastNumber) {
    return ('Задан неверный диапазон!');
  }

  return Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;
}

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно

const getRandomArbitrary = (min, max, maxDigits = 0) => {
  if (min > max || min < 0 || max <= 0) {
    return ('Задан неверный диапазон!');
  }

  let randomArbitrary = Math.random() * (max - min + 1) + min;
  return randomArbitrary.toFixed(maxDigits);
}

export {getRandomNumber, getRandomArbitrary};

// Сообщение об ошибке

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.margin = '25vh 25vw';
  alertContainer.style.lineHeight = '30px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

// Проверка на нажатую клавишу escape

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const isEscEvent = (evt) => {
  return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
};

export {showAlert, isEscEvent};
