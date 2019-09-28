/* eslint-disable no-console */
'use strict';

var cardGlobal = document.querySelector('.map'); // область изображения карты
var mapPins = document.querySelector('.map__pins');
var fragmentMarker = document.createDocumentFragment();
var templateMarker = document.querySelector('#pin').content.querySelector('button');
var templateWindow = document.querySelector('#card').content.querySelector('article');
var BUILDINGS = []; // массив объявлений
var TITLES = ['Уютно и дешево', 'Потрать свою зарплату здесь', 'Проведи романтический вечер', 'Здесь не так грустно умереть', 'Мы позволяем все', 'Просто поспать', 'Убеги от жены к нам', 'Холостяцкая опочивальня'];
var featuresObj = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosObj = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typesObj = ['palace', 'flat', 'house', 'bungalo'];
var describObj = ['Проводим вечеринки', 'Здесь тусовался Ельцин', 'Подходит бедным и богатым', 'Работаем круглосуточно, приходи под утро'];
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
var selectRooms = adForm.children[6].children[1];
var selectGuests = adForm.children[7].children[1];
getDisabledForm(adForm);
getDisabledForm(mapFilters);
fillAdress(markCenterXcorrect, markCenterYcorrect);

for (var i = 0; i < 8; i++) {
  BUILDINGS.push(generateOffer(i));
  renderMarker(templateMarker.cloneNode(true), BUILDINGS[i]);
}

mapPins.appendChild(fragmentMarker);
cardGlobal.insertBefore(templateWindow.cloneNode(true), cardGlobal.querySelector('.map__filters-container'));


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

selectRooms.addEventListener('change', function () {
  var oneRoom = selectRooms.children[0];
  var twoRoom = selectRooms.children[1];
  var threeRoom = selectRooms.children[2];
  var hundredRoom = selectRooms.children[3];
  var fiveCats = selectGuests.children[0];
  var fourCats = selectGuests.children[1];
  var threeCats = selectGuests.children[2];
  var twoCats = selectGuests.children[3];
  var oneCats = selectGuests.children[4];
  var manyCats = selectGuests.children[5];
  if (oneRoom.selected) {
    getRefreshGuests();
    twoCats.setAttribute('selected', 'selected');
    fiveCats.setAttribute('disabled', 'disabled');
    fourCats.setAttribute('disabled', 'disabled');
    threeCats.setAttribute('disabled', 'disabled');
    manyCats.setAttribute('disabled', 'disabled');
  }
  if (twoRoom.selected) {
    getRefreshGuests();
    threeCats.setAttribute('selected', 'selected');
    fiveCats.setAttribute('disabled', 'disabled');
    fourCats.setAttribute('disabled', 'disabled');
    manyCats.setAttribute('disabled', 'disabled');
  }
  if (threeRoom.selected) {
    getRefreshGuests();
    fiveCats.setAttribute('selected', 'selected');
    manyCats.setAttribute('disabled', 'disabled');
  }
  if (hundredRoom.selected) {
    getRefreshGuests();
    manyCats.setAttribute('selected', 'selected');
    fiveCats.setAttribute('disabled', 'disabled');
    fourCats.setAttribute('disabled', 'disabled');
    threeCats.setAttribute('disabled', 'disabled');
    twoCats.setAttribute('disabled', 'disabled');
    oneCats.setAttribute('disabled', 'disabled');
  }
});

adForm.children[3].children[1].addEventListener('change', function () {
  var type = adForm.children[3].children[1];
  var price = adForm.children[4].children[1];
  if (type.children[0].selected) {
    price.min = 0;
  }
  if (type.children[1].selected) {
    price.min = 1000;
  }
  if (type.children[2].selected) {
    price.min = 5000;
  }
  if (type.children[3].selected) {
    price.min = 10000;
  }
});

adForm.children[5].children[1].addEventListener('change', priorityArrive);
adForm.children[5].children[2].addEventListener('change', priorityDeparture);

function priorityArrive() {
  addActionChangeHandler(adForm.children[5].children[1], adForm.children[5].children[2]);
  adForm.children[5].children[2].removeEventListener('change', priorityDeparture);
}
function priorityDeparture() {
  addActionChangeHandler(adForm.children[5].children[2], adForm.children[5].children[1]);
  adForm.children[5].children[1].removeEventListener('change', priorityArrive);
}

function addActionChangeHandler(actionOne, actionTwo) {
  if (actionOne.children[0].selected) {
    actionTwo.children[2].removeAttribute('selected', 'selected');
    actionTwo.children[1].removeAttribute('selected', 'selected');
    actionTwo.children[0].removeAttribute('selected', 'selected');
    actionTwo.children[0].setAttribute('selected', 'selected');
  }
  if (actionOne.children[1].selected) {
    actionTwo.children[2].removeAttribute('selected', 'selected');
    actionTwo.children[1].removeAttribute('selected', 'selected');
    actionTwo.children[0].removeAttribute('selected', 'selected');
    actionTwo.children[1].setAttribute('selected', 'selected');
  }
  if (actionOne.children[2].selected) {
    actionTwo.children[2].removeAttribute('selected', 'selected');
    actionTwo.children[1].removeAttribute('selected', 'selected');
    actionTwo.children[0].removeAttribute('selected', 'selected');
    actionTwo.children[2].setAttribute('selected', 'selected');
  }
}

console.log(adForm.children[5].children[1]);
console.log(adForm.children[5].children[2]);

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
      'description': getRandomItem(describObj),
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

function getRefreshGuests() {
  for (var j = 0; j < selectGuests.length; j++) {
    selectGuests.children[j].removeAttribute('disabled');
    selectGuests.children[j].removeAttribute('selected');
  }
}

function generateFeatures(list, length) {
  for (var k = 0; k < length; k++) {
    var newElement = document.createElement('li');
    newElement.className = 'popup__feature popup__feature--' + featuresObj[k];
    list.appendChild(newElement);
  }
  return list.children;
}

function generatePhotos(list, length) {
  for (var p = 0; p < length; p++) {
    var newElement = document.createElement('img');
    newElement.setAttribute('src', photosObj[p]);
    newElement.className = 'popup__photo';
    newElement.setAttribute('width', 45);
    newElement.setAttribute('height', 40);
    newElement.setAttribute('alt', 'Фотография жилья');
    list.appendChild(newElement);
  }
  return list.children;
}

for (var j = 0; j < BUILDINGS.length; j++) {
  addPinClickHandler(mapPins.children[j + 2], BUILDINGS[j]);
}

function addPinClickHandler(pin, building) {
  var mapCard = cardGlobal.children[1];
  pin.addEventListener('click', function () {
    mapCard.children[8].innerHTML = '';
    mapCard.children[10].innerHTML = '';
    mapCard.children[0].src = building.author.avatar;
    mapCard.children[2].textContent = building.offer.title;
    mapCard.children[3].textContent = building.offer.address;
    mapCard.children[4].textContent = building.offer.price + ' ₽/ночь';
    mapCard.children[5].textContent = TYPES_TEXTS_MAP[building.offer.type];
    mapCard.children[6].textContent = generateRoomsGuests(building.offer.rooms, building.offer.guests);
    mapCard.children[7].textContent = 'Заезд после ' + building.offer.checkin + ', выезд до ' + building.offer.checkout;
    generateFeatures(mapCard.children[8], building.offer.features.length);
    mapCard.children[9].textContent = building.offer.description;
    generatePhotos(mapCard.children[10], building.offer.photos.length);
  });
}

console.log(adForm.children[5]);
console.log(BUILDINGS);
console.log(mapPins);
console.log(cardGlobal.children[1]);


