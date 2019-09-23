'use strict';

var cardGlobal = document.querySelector('.map'); // область изображения карты
cardGlobal.classList.remove('map--faded');
var mapMarker = document.querySelector('.map__pins'); // карта меток
var fragmentMarker = document.createDocumentFragment();
var fragmentWindow = document.createDocumentFragment();
var templateMarker = document.querySelector('#pin').content.querySelector('button'); // аватарка на карте
var templateWindow = document.querySelector('#card').content.querySelector('article'); // модальное окно
var arrayObjkt = []; // массив объявлений
var titlObjkt = ['Уютно и дешево', 'Потрать свою зарплату здесь', 'Проведи романтический вечер', 'Здесь не так грустно умереть', 'Мы позволяем все', 'Просто поспать', 'Убеги от жены к нам', 'Холостяцкая опочивальня'];
var featurObjkt = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var fotoObjkt = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typeObjkt = ['palace', 'flat', 'house', 'bungalo'];

for (var i = 0; i < 8; i++) {
  // eslint-disable-next-line object-curly-spacing
  arrayObjkt[i] = { 'author': {}, 'offer': {}, 'location': {} };
  renderOffer(arrayObjkt[i], i);
  generateOffer(templateMarker.cloneNode(true), i);
}

generateWindow(templateWindow.cloneNode(true), arrayObjkt[0]); // модальное окно для первого элемента
mapMarker.appendChild(fragmentMarker);
cardGlobal.insertBefore(fragmentWindow, cardGlobal.querySelector('.map__filters-container'));

function renderOffer(object, index) {
  object.location.x = getRandomNumber(50, 1100);
  object.location.y = getRandomNumber(130, 630);
  object.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';
  object.offer.title = titlObjkt[index];
  object.offer.address = '' + object.location.x + ', ' + object.location.y + '';
  object.offer.price = getRandomNumber(1000, 10000);
  object.offer.type = getRandomItem(typeObjkt);
  object.offer.rooms = getRandomNumber(1, 5);
  object.offer.guests = getRandomNumber(1, 3);
  object.offer.checkin = getRandomItem(['12:00', '13:00', '14:00']);
  object.offer.checkout = getRandomItem(['12:00', '13:00', '14:00']);
  object.offer.features = getRandomMassive(featurObjkt, []);
  object.offer.description = 'Пока не хватает фантазии для описания))';
  object.offer.photos = getRandomMassive(fotoObjkt, []);
}

function generateOffer(objectMarker, index) {
  objectMarker.style = 'left: ' + arrayObjkt[index].location.x + 'px; top: ' + arrayObjkt[index].location.y + 'px;';
  objectMarker.children[0].src = arrayObjkt[index].author.avatar;
  objectMarker.children[0].alt = arrayObjkt[index].offer.title;
  fragmentMarker.appendChild(objectMarker);
}

function generateWindow(windowFirst, object) {
  windowFirst.children[2].textContent = object.offer.title;
  windowFirst.children[3].textContent = object.offer.address;
  windowFirst.children[4].textContent = object.offer.price;
  windowFirst.children[5].textContent = renderType(typeObjkt, object.offer.type);
  windowFirst.children[6].textContent = renderRoomsGuests(object.offer.rooms, object.offer.guests);
  windowFirst.children[7].textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout + '';
  renderChild(windowFirst.children[8], object.offer.features);
  windowFirst.children[9].textContent = object.offer.description;
  renderPhoto(windowFirst.children[10], windowFirst.children[10].children[0], object.offer.photos);
  fragmentWindow.appendChild(windowFirst);
}

function getRandomMassive(massiveOne, massiveTwo) {
  for (var j = 0; j < getRandomNumber(0, massiveOne.length); j++) {
    massiveTwo.push(massiveOne[j]);
  }
  return massiveTwo;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(array) {
  var index = Math.floor(Math.random() * array.length);
  var randomItem = array[index];
  return randomItem;
}

function renderType(massiveOne, type) {
  var massiveTwo = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  for (var j = 0; j < massiveOne.length; j++) {
    if (type === massiveOne[j]) {
      var newType = massiveTwo[j];
    }
  }
  return newType;
}

function renderRoomsGuests(rooms, guests) {
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

function renderChild(collection, array) {
  for (var j = collection.children.length - 1; j >= array.length; j--) {
    collection.removeChild(collection.children[j]);
  }
  return collection.children;
}

function renderPhoto(collection, atalon, array) {
  if (array.length) {
    for (var j = 0; j < array.length - 1; j++) {
      collection.appendChild(atalon.cloneNode(true));
    }
  } else {
    collection.removeChild(atalon);
  }
  for (var k = 0; k < array.length; k++) {
    collection.children[k].src = array[k];
  }
  return collection.children;
}

// eslint-disable-next-line no-console
console.log(arrayObjkt);
// eslint-disable-next-line no-console
console.log(mapMarker);
// eslint-disable-next-line no-console
console.log(cardGlobal);

// function renderOffer(index) {
//   return {
//     'author': {
//       'avatar': 'img/avatars/user0' + (index + 1) + '.png'
//     },
//     'offer': {
//       'title': titlObjkt[index],
//       'address': '' + object.location.x + ', ' + object.location.y + '',
//       'price': getRandomNumber(1000, 10000),
//       'type': getRandomItem(typeObjkt),
//       'rooms': getRandomNumber(1, 5),
//       'guests': getRandomNumber(1, 3),
//       'checkin': getRandomItem(['12:00', '13:00', '14:00']),
//       'checkout': getRandomItem(['12:00', '13:00', '14:00']),
//       'features': getRandomMassive(featurObjkt, []),
//       'description': 'Пока не хватает фантазии для описания))',
//       'photos': getRandomMassive(fotoObjkt, [])
//     }
//     'location': {
//       'x': getRandomNumber(50, 1100)
//       'y': getRandomNumber(130, 630)
//     }
//     object.location.x = ;
//     object.location.y = ;

//   }
// }
