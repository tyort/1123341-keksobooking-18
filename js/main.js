'use strict';

var cardGlobal = document.querySelector('.map'); // область в пределах изображения карты
cardGlobal.classList.remove('map--faded'); // удаляем класс
var mapMarker = document.querySelector('.map__pins'); // карта меток
var templateMarker = document.querySelector('#pin').content.querySelector('button'); // контент из template
var headOffer = ['Уютно и дешево', 'Потрать свою зарплату здесь', 'Проведи романтический вечер', 'Здесь не так грустно умереть', 'Мы позволяем все', 'Просто поспать', 'Убеги от жены к нам', 'Холостяцкая опочивальня']; // список заголовков объявлений
var featureOfferAll = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // список возможных услуг
var photoOffer = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var fullOffer = []; // список объявлений

for (var i = 0; i < 8; i++) {
  var locationMarkerX = getRandomNumber(50, 1100); // координата Х маркера
  var locationMarkerY = getRandomNumber(130, 630); // координата Y маркера
  fullOffer[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'offer': {
      'title': headOffer[i],
      'address': locationMarkerX + ', ' + locationMarkerY,
      'price': getRandomNumber(1000, 10000),
      'type': getRandomItem(['palace', 'flat', 'house', 'bungalo']),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 3),
      'checkin': getRandomItem(['12:00', '13:00', '14:00']),
      'checkout': getRandomItem(['12:00', '13:00', '14:00']),
      'features': '',
      'description': '',
      'photos': ''
    },
    'location': {
      'x': locationMarkerX,
      'y': locationMarkerY
    }
  };
  var offerMarker = templateMarker.cloneNode(true); // клон <button> из template
  offerMarker.style = 'left: ' + locationMarkerX + 'px' + '; top: ' + locationMarkerY + 'px' + ';';
  offerMarker.children[0].src = 'img/avatars/user0' + (i + 1) + '.png'; // фото метки
  offerMarker.children[0].alt = headOffer[i];
  mapMarker.appendChild(offerMarker); // добавляем <button> в карту меток .map__pins
  renderOffer(fullOffer[i]);
}


function renderOffer(proposal) {
  proposal.offer.features = getRandomMassive(featureOfferAll, []);
  proposal.offer.photos = getRandomMassive(photoOffer, []);
}

function getRandomMassive(massiveOne, massiveTwo) {
  for (var j = 0; j < getRandomNumber(0, massiveOne.length); j++) {
    massiveTwo[j] = massiveOne[j];
  }
  return massiveTwo;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(massive) {
  var index = Math.floor(Math.random() * massive.length);
  var randomItem = massive[index];
  return randomItem;
}

console.log(fullOffer);
