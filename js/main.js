'use strict';

var cardGlobal = document.querySelector('.map'); // область изображения карты
cardGlobal.classList.remove('map--faded');
var mapMarker = document.querySelector('.map__pins'); // карта меток
var fragmentMarker = document.createDocumentFragment();
var fragmentWindow = document.createDocumentFragment();
var templateMarker = document.querySelector('#pin').content.querySelector('button');
var templateWindow = document.querySelector('#card').content.querySelector('article');
var ArrayObject = []; // массив объявлений
var titlesObject = ['Уютно и дешево', 'Потрать свою зарплату здесь', 'Проведи романтический вечер', 'Здесь не так грустно умереть', 'Мы позволяем все', 'Просто поспать', 'Убеги от жены к нам', 'Холостяцкая опочивальня'];
var featuresObject = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosObject = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typesObject = ['palace', 'flat', 'house', 'bungalo'];

for (var i = 0; i < 8; i++) {
  // eslint-disable-next-line object-curly-spacing
  ArrayObject[i] = { 'author': {}, 'offer': {}, 'location': {} };
  generateOffer(ArrayObject[i], i);
  renderMarker(templateMarker.cloneNode(true), i);
}
renderWindow(templateWindow.cloneNode(true), ArrayObject[0]);

mapMarker.appendChild(fragmentMarker);
cardGlobal.insertBefore(fragmentWindow, cardGlobal.querySelector('.map__filters-container'));

function generateOffer(object, index) {
  object.location.x = getRandomNumber(50, 1100);
  object.location.y = getRandomNumber(130, 630);
  object.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';
  object.offer.title = titlesObject[index];
  object.offer.address = '' + object.location.x + ', ' + object.location.y + '';
  object.offer.price = getRandomNumber(1000, 10000);
  object.offer.type = getRandomItem(['palace', 'flat', 'house', 'bungalo']);
  object.offer.rooms = getRandomNumber(1, 5);
  object.offer.guests = getRandomNumber(1, 3);
  object.offer.checkin = getRandomItem(['12:00', '13:00', '14:00']);
  object.offer.checkout = getRandomItem(['12:00', '13:00', '14:00']);
  object.offer.features = getRandomArray(featuresObject, []);
  object.offer.description = 'Пока ничего не придумал:)';
  object.offer.photos = getRandomArray(photosObject, []);
}

function renderMarker(objectMarker, index) {
  objectMarker.style = 'left: ' + ArrayObject[index].location.x + 'px; top: ' + ArrayObject[index].location.y + 'px;';
  objectMarker.children[0].src = 'img/avatars/user0' + (index + 1) + '.png';
  objectMarker.children[0].alt = titlesObject[index];
  fragmentMarker.appendChild(objectMarker);
}

function renderWindow(windowFirst, object) {
  windowFirst.children[0].src = object.author.avatar;
  windowFirst.children[2].textContent = object.offer.title;
  windowFirst.children[3].textContent = object.offer.address;
  windowFirst.children[4].textContent = object.offer.price;
  windowFirst.children[5].textContent = generateType(typesObject, object.offer.type);
  windowFirst.children[6].textContent = generateRoomsGuests(object.offer.rooms, object.offer.guests);
  windowFirst.children[7].textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout + '';
  generateChild(windowFirst.children[8], object.offer.features);
  windowFirst.children[9].textContent = object.offer.description;
  generatePhoto(windowFirst.children[10], object.offer.photos);
  fragmentWindow.appendChild(windowFirst);
}

function getRandomArray(ArrayOne, ArrayTwo) {
  for (var j = 0; j < getRandomNumber(0, ArrayOne.length); j++) {
    ArrayTwo.push(ArrayOne[j]);
  }
  return ArrayTwo;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(Array) {
  var index = Math.floor(Math.random() * Array.length);
  var randomItem = Array[index];
  return randomItem;
}

function generateType(ArrayOne, type) {
  var ArrayTwo = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  for (var j = 0; j < ArrayOne.length; j++) {
    if (type === ArrayOne[j]) {
      var newType = ArrayTwo[j];
    }
  }
  return newType;
}

function generateRoomsGuests(rooms, guests) {
  var partOne = 'а';
  if (rooms > 1 && rooms < 5) {
    partOne = 'ы';
  }
  if (rooms >= 5) {
    partOne = '';
  }
  var partTwo = 'я';
  if (guests > 1) {
    partTwo = 'ей';
  }
  return rooms + ' комнат' + partOne + ' для ' + guests + ' гост' + partTwo;
}

function generateChild(collection, Array) {
  for (var j = collection.children.length - 1; j >= Array.length; j--) {
    collection.removeChild(collection.children[j]);
  }
}

function generatePhoto(collection, Array) {
  if (Array.length) {
    for (var j = 0; j < Array.length - 1; j++) {
      collection.appendChild(collection.children[0].cloneNode(true));
    }
  } else {
    collection.removeChild(collection.children[0]);
  }
  for (var k = 0; k < Array.length; k++) {
    collection.children[k].src = Array[k];
  }
}

// eslint-disable-next-line no-console
console.log(ArrayObject);
// eslint-disable-next-line no-console
console.log(mapMarker);
// eslint-disable-next-line no-console
console.log(cardGlobal);
