'use strict';

var cardGlobal = document.querySelector('.map'); // область изображения карты
cardGlobal.classList.remove('map--faded');
var mapMarker = document.querySelector('.map__pins'); // карта меток
var fragment = document.createDocumentFragment();
var templateMarker = document.querySelector('#pin').content.querySelector('button'); // аватарка на карте
var templateWindow = document.querySelector('#card').content.querySelector('article'); // модальное окно
var arrayObjkt = []; // массив объявлений
var titlObjkt = ['Уютно и дешево', 'Потрать свою зарплату здесь', 'Проведи романтический вечер', 'Здесь не так грустно умереть', 'Мы позволяем все', 'Просто поспать', 'Убеги от жены к нам', 'Холостяцкая опочивальня'];
var featurObjkt = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var fotoObjkt = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typeObjkt = ['palace', 'flat', 'house', 'bungalo'];

for (var i = 0; i < 8; i++) {
  arrayObjkt[i] = {'author': {}, 'offer': {}, 'location': {}};
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
  object.offer.type = getRandomItem(typeObjkt);
  object.offer.rooms = getRandomNumber(1, 5);
  object.offer.guests = getRandomNumber(1, 3);
  object.offer.checkin = getRandomItem(['12:00', '13:00', '14:00']);
  object.offer.checkout = getRandomItem(['12:00', '13:00', '14:00']);
  object.offer.features = getRandomMassive(featurObjkt, []);
  object.offer.photos = getRandomMassive(fotoObjkt, []);
  objectMarker.style = 'left: ' + object.location.x + 'px; top: ' + object.location.y + 'px;';
  objectMarker.children[0].src = object.author.avatar;
  objectMarker.children[0].alt = object.offer.title;
  fragment.appendChild(objectMarker);
}

var windowFirst = templateWindow.cloneNode(true);
windowFirst.children[2].textContent = arrayObjkt[0].offer.title;
windowFirst.children[3].textContent = arrayObjkt[0].offer.address;
windowFirst.children[4].textContent = arrayObjkt[0].offer.price;
windowFirst.children[5].textContent = renderType(typeObjkt, arrayObjkt[0].offer.type);
windowFirst.children[6].textContent = renderRoomsGuests(arrayObjkt[0].offer.rooms, arrayObjkt[0].offer.guests);
windowFirst.children[7].textContent = 'Заезд после ' + arrayObjkt[0].offer.checkin + ', выезд до ' + arrayObjkt[0].offer.checkout + '';

console.log(windowFirst);

// {/* <article class="map__card popup">
//       <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
//       <button type="button" class="popup__close">Закрыть</button>
//       <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
//       <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
//       <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
//       <h4 class="popup__type">Квартира</h4>
//       <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
//       <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
//       <ul class="popup__features">
//         <li class="popup__feature popup__feature--wifi"></li>
//         <li class="popup__feature popup__feature--dishwasher"></li>
//         <li class="popup__feature popup__feature--parking"></li>
//         <li class="popup__feature popup__feature--washer"></li>
//         <li class="popup__feature popup__feature--elevator"></li>
//         <li class="popup__feature popup__feature--conditioner"></li>
//       </ul>
//       <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
//       <div class="popup__photos">
//         <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
//       </div>
//     </article> */}

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

console.log(arrayObjkt);
console.log(mapMarker);
