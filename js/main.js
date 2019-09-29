'use strict';

var cardGlobal = document.querySelector('.map'); // область изображения карты
var mapMarker = document.querySelector('.map__pins'); // карта меток
var fragmentMarker = document.createDocumentFragment();
var fragmentWindow = document.createDocumentFragment();
var templateMarker = document.querySelector('#pin').content.querySelector('button');
var templateWindow = document.querySelector('#card').content.querySelector('article');
var BUILDINGS = []; // массив объявлений
var TITLES = ['Уютно и дешево', 'Потрать свою зарплату здесь', 'Проведи романтический вечер', 'Здесь не так грустно умереть', 'Мы позволяем все', 'Просто поспать', 'Убеги от жены к нам', 'Холостяцкая опочивальня'];
var featuresObj = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosObj = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typesObj = ['palace', 'flat', 'house', 'bungalo'];
// eslint-disable-next-line object-curly-spacing
var TYPES_TEXTS_MAP = { 'palace': 'дворец', 'flat': 'квартира', 'house': 'дом', 'bungalo': 'бунгало' };
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = cardGlobal.querySelector('.map__pin--main');
var ENTER_KEYCODE = 13;
var markCenterXcorrect = parseInt(mapPinMain.style.left, 10) + 35;
var markCenterYcorrect = parseInt(mapPinMain.style.top, 10) + 35;
var markEdgeXcorrect = parseInt(mapPinMain.style.left, 10) + 35;
var markEdgeYcorrect = parseInt(mapPinMain.style.top, 10) + 79;
getDisabledForm(adForm);
getDisabledForm(mapFilters);
fillAdress(markCenterXcorrect, markCenterYcorrect);

mapPinMain.addEventListener('mousedown', function () {
  activatePage();
  fillAdress(markEdgeXcorrect, markEdgeYcorrect);
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
    fillAdress(markEdgeXcorrect, markEdgeYcorrect);
  }
});

function activatePage() {
  getEnabledForm(adForm);
  getEnabledForm(mapFilters);
  cardGlobal.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
}

function fillAdress(x, y) {
  var part = 'острого конца';
  if (cardGlobal.classList.contains('map--faded')) {
    part = 'центра';
  }
  var adressText = x + ' расстояние до ' + part + ' по горизонтали, ' + y + ' расстояние до ' + part + ' по вертикали';
  adForm.children[2].children[1].setAttribute('placeholder', adressText);
}

for (var i = 0; i < 8; i++) {
  BUILDINGS.push(generateOffer(i));
  renderMarker(templateMarker.cloneNode(true), BUILDINGS[i]);
}
renderWindow(templateWindow.cloneNode(true), BUILDINGS[0]);

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
      'title': TITLES[index],
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

function renderMarker(ObjMarker, apartment) {
  ObjMarker.style = 'left: ' + apartment.location.x + 'px; top: ' + apartment.location.y + 'px;';
  ObjMarker.children[0].src = apartment.author.avatar;
  ObjMarker.children[0].alt = apartment.offer.title;
  fragmentMarker.appendChild(ObjMarker);
}

function renderWindow(ObjWindow, apartment) {
  ObjWindow.children[0].src = apartment.author.avatar;
  ObjWindow.children[2].textContent = apartment.offer.title;
  ObjWindow.children[3].textContent = apartment.offer.address;
  ObjWindow.children[4].textContent = apartment.offer.price;
  ObjWindow.children[5].textContent = TYPES_TEXTS_MAP[apartment.offer.type];
  ObjWindow.children[6].textContent = generateRoomsGuests(apartment.offer.rooms, apartment.offer.guests);
  ObjWindow.children[7].textContent = 'Заезд после ' + apartment.offer.checkin + ', выезд до ' + apartment.offer.checkout + '';
  generateChild(ObjWindow.children[8], apartment.offer.features);
  ObjWindow.children[9].textContent = apartment.offer.description;
  generatePhoto(ObjWindow.children[10], apartment.offer.photos);
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

function generateRoomsGuests(rooms, guests) {
  var part = 'а';
  if (rooms > 1 && rooms < 5) {
    part = 'ы';
  }
  if (rooms >= 5) {
    part = '';
  }
  var partTwo = 'я';
  if (guests > 1) {
    partTwo = 'ей';
  }
  return rooms + ' комнат' + part + ' для ' + guests + ' гост' + partTwo;
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

function getDisabledForm(form) {
  for (var j = 0; j < form.children.length; j++) {
    if (!form.children[j].getAttribute('disabled')) {
      form.children[j].setAttribute('disabled', 'disabled');
    }
  }
}

function getEnabledForm(form) {
  for (var j = 0; j < form.children.length; j++) {
    if (form.children[j].getAttribute('disabled')) {
      form.children[j].removeAttribute('disabled');
    }
  }
}

// eslint-disable-next-line no-console
console.log(BUILDINGS);
// eslint-disable-next-line no-console
console.log(mapMarker);
// eslint-disable-next-line no-console
console.log(cardGlobal);

var selectRooms = adForm.children[6].children[1];
var selectGuests = adForm.children[7].children[1];

if (selectRooms.children[0]) {
  selectGuests.children[0].setAttribute('disabled', 'disabled');
  selectGuests.children[1].setAttribute('disabled', 'disabled');
  selectGuests.children[2].setAttribute('disabled', 'disabled');
  selectGuests.children[5].setAttribute('disabled', 'disabled');
}

function getRefreshGuests() {
  for (var j = 0; j < selectGuests.length; j++) {
    selectGuests.children[j].removeAttribute('disabled');
    selectGuests.children[j].removeAttribute('selected');
  }
}

selectRooms.addEventListener('change', function () {
  if (selectRooms.children[0].selected) {
    getRefreshGuests();
    selectGuests.children[3].setAttribute('selected', 'selected');
    selectGuests.children[0].setAttribute('disabled', 'disabled');
    selectGuests.children[1].setAttribute('disabled', 'disabled');
    selectGuests.children[2].setAttribute('disabled', 'disabled');
    selectGuests.children[5].setAttribute('disabled', 'disabled');
  }
  if (selectRooms.children[1].selected) {
    getRefreshGuests();
    selectGuests.children[2].setAttribute('selected', 'selected');
    selectGuests.children[0].setAttribute('disabled', 'disabled');
    selectGuests.children[1].setAttribute('disabled', 'disabled');
    selectGuests.children[5].setAttribute('disabled', 'disabled');
  }
  if (selectRooms.children[2].selected) {
    getRefreshGuests();
    selectGuests.children[0].setAttribute('selected', 'selected');
    selectGuests.children[5].setAttribute('disabled', 'disabled');
  }
  if (selectRooms.children[3].selected) {
    getRefreshGuests();
    selectGuests.children[5].setAttribute('selected', 'selected');
    selectGuests.children[0].setAttribute('disabled', 'disabled');
    selectGuests.children[1].setAttribute('disabled', 'disabled');
    selectGuests.children[2].setAttribute('disabled', 'disabled');
    selectGuests.children[3].setAttribute('disabled', 'disabled');
    selectGuests.children[4].setAttribute('disabled', 'disabled');
  }
});
