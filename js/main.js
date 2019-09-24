'use strict';

var cardGlobal = document.querySelector('.map'); // область изображения карты
cardGlobal.classList.remove('map--faded');
var mapMarker = document.querySelector('.map__pins'); // карта меток
var fragmentMarker = document.createDocumentFragment();
var fragmentWindow = document.createDocumentFragment();
var templateMarker = document.querySelector('#pin').content.querySelector('button');
var templateWindow = document.querySelector('#card').content.querySelector('article');
var ArrayObj = []; // массив объявлений
var titlesObj = ['Уютно и дешево', 'Потрать свою зарплату здесь', 'Проведи романтический вечер', 'Здесь не так грустно умереть', 'Мы позволяем все', 'Просто поспать', 'Убеги от жены к нам', 'Холостяцкая опочивальня'];
var featuresObj = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosObj = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typesObj = ['palace', 'flat', 'house', 'bungalo'];

for (var i = 0; i < 8; i++) {
  ArrayObj.push(generateOffer(i));
  renderMarker(templateMarker.cloneNode(true), ArrayObj[i], i);
}
renderWindow(templateWindow.cloneNode(true), ArrayObj[0]);

mapMarker.appendChild(fragmentMarker);
cardGlobal.insertBefore(fragmentWindow, cardGlobal.querySelector('.map__filters-container'));

function generateOffer(index) {
  var locationX = getRandomNumber(50, 1100);
  var locationY = getRandomNumber(130, 630);
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },
    'offer': {
      'title': titlesObj[index],
      'address': '' + locationX + ', ' + locationY + '',
      'price': getRandomNumber(1000, 10000),
      'type': getRandomItem(typesObj),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 3),
      'checkin': getRandomItem(['12:00', '13:00', '14:00']),
      'checkout': getRandomItem(['12:00', '13:00', '14:00']),
      'features': getRandomArray(featuresObj, []),
      'description': 'Пока ничего не придумал:)',
      'photos': getRandomArray(photosObj, [])
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };
}

function renderMarker(ObjMarker, ArrObj, index) {
  ObjMarker.style = 'left: ' + ArrObj.location.x + 'px; top: ' + ArrObj.location.y + 'px;';
  ObjMarker.children[0].src = 'img/avatars/user0' + (index + 1) + '.png';
  ObjMarker.children[0].alt = ArrObj.offer.title;
  fragmentMarker.appendChild(ObjMarker);
}

function renderWindow(ObjWindow, ArrObj) {
  ObjWindow.children[0].src = ArrObj.author.avatar;
  ObjWindow.children[2].textContent = ArrObj.offer.title;
  ObjWindow.children[3].textContent = ArrObj.offer.address;
  ObjWindow.children[4].textContent = ArrObj.offer.price;
  ObjWindow.children[5].textContent = generateType(typesObj, ArrObj.offer.type);
  ObjWindow.children[6].textContent = generateRoomsGuests(ArrObj.offer.guests, ArrObj.offer.guests);
  ObjWindow.children[7].textContent = 'Заезд после ' + ArrObj.offer.checkin + ', выезд до ' + ArrObj.offer.checkout + '';
  generateChild(ObjWindow.children[8], ArrObj.offer.features);
  ObjWindow.children[9].textContent = ArrObj.offer.description;
  generatePhoto(ObjWindow.children[10], ArrObj.offer.photos);
  fragmentWindow.appendChild(ObjWindow);
}

function getRandomArray(ArrayOne, ArrayTwo) {
  for (var k = 0; k < getRandomNumber(0, ArrayOne.length); k++) {
    ArrayTwo.push(ArrayOne[k]);
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
  for (var n = 0; n < ArrayOne.length; n++) {
    if (type === ArrayOne[n]) {
      var newType = ArrayTwo[n];
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
  for (var l = collection.children.length - 1; l >= Array.length; l--) {
    collection.removeChild(collection.children[l]);
  }
}

function generatePhoto(collection, Array) {
  if (Array.length) {
    for (var m = 0; m < Array.length - 1; m++) {
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
console.log(ArrayObj);
// eslint-disable-next-line no-console
console.log(mapMarker);
// eslint-disable-next-line no-console
console.log(cardGlobal);
