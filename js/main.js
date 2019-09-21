'use strict';

var cardGlobal = document.querySelector('.map'); // область изображения карты
cardGlobal.classList.remove('map--faded');
var mapMarker = document.querySelector('.map__pins'); // карта меток
var fragment = document.createDocumentFragment();
var templateMarker = document.querySelector('#pin').content.querySelector('button'); // контент из template
var arrayObjkt = []; // массив объявлений
var titlObjkt = ['Уютно и дешево', 'Потрать свою зарплату здесь', 'Проведи романтический вечер', 'Здесь не так грустно умереть', 'Мы позволяем все', 'Просто поспать', 'Убеги от жены к нам', 'Холостяцкая опочивальня'];
var featurObjkt = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var fotoObjkt = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

for (var i = 0; i < 8; i++) {
  arrayObjkt[i] = {
    'author': {
      'avatar': ''
    },
    'offer': {
      'title': '',
      'address': '',
      'price': '',
      'type': '',
      'rooms': '',
      'guests': '',
      'checkin': '',
      'checkout': '',
      'features': '',
      'description': '',
      'photos': ''
    },
    'location': {
      'x': '',
      'y': ''
    }
  };
  renderOffer(arrayObjkt[i], i, templateMarker.cloneNode(true));
}
mapMarker.appendChild(fragment);


function renderOffer(object, index, objectMarker) {
  object.location.x = getRandomNumber(50, 1100);
  object.location.y = getRandomNumber(130, 630);
  object.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';
  object.offer.title = titlObjkt[index];
  object.offer.address = '' + object.location.x + ', ' + object.location.y + '';
  object.offer.price = getRandomNumber(1000, 10000);
  object.offer.type = getRandomItem(['palace', 'flat', 'house', 'bungalo']);
  object.offer.rooms = getRandomNumber(1, 5);
  object.offer.guests = getRandomNumber(1, 3);
  object.offer.checkin = getRandomItem(['12:00', '13:00', '14:00']);
  object.offer.checkout = getRandomItem(['12:00', '13:00', '14:00']);
  object.offer.features = getRandomMassive(featurObjkt, []);
  object.offer.photos = getRandomMassive(fotoObjkt, []);
  objectMarker.style = 'left: ' + object.location.x + 'px; top: ' + object.location.y + 'px;';
  objectMarker.children[0].src = 'img/avatars/user0' + (index + 1) + '.png';
  objectMarker.children[0].alt = titlObjkt[index];
  fragment.appendChild(objectMarker);
}

// console.log(mapMarker.children[3].children[0].alt);

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

function getRandomItem(massive) {
  var index = Math.floor(Math.random() * massive.length);
  var randomItem = massive[index];
  return randomItem;
}

// console.log(arrayObjkt);
