/* eslint-disable no-console */
'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var ENTER_KEYCODE = 13;
  var ESCAPE_KEYCODE = 27;
  var cardGlobal = document.querySelector('.map'); // область изображения карты
  var templateWindow = document.querySelector('#card').content.querySelector('article');
  var templateMarker = document.querySelector('#pin').content.querySelector('button');
  var adds = document.querySelector('#address');
  cardGlobal.insertBefore(templateWindow.cloneNode(true), cardGlobal.querySelector('.map__filters-container'));
  // eslint-disable-next-line object-curly-spacing
  var TYPES_TEXTS_MAP = { 'palace': 'дворец', 'flat': 'квартира', 'house': 'дом', 'bungalo': 'бунгало' };
  var mapCard = document.querySelector('.map__card');
  mapCard.classList.add('delete_advert');

  window.load(onHousesSuccess);

  function onHousesSuccess(houses) {
    renderPinHouses(houses);
    fillHouseAdvert(houses, addPinClickHandler);
  }

  function renderPinHouses(houses) {
    var fragmentMarker = document.createDocumentFragment();
    for (var i = 0; i < houses.length; i++) {
      fragmentMarker.appendChild(renderHouse(houses[i]));

    }
    mapPins.appendChild(fragmentMarker);
  }

  function renderHouse(houseUnit) {
    var element = templateMarker.cloneNode(true);
    element.style.left = houseUnit.location.x + 'px';
    element.style.top = houseUnit.location.y + 'px';
    element.getElementsByTagName('img')[0].src = houseUnit.author.avatar;
    element.classList.add('delete_advert');
    return element;
  }

  function fillHouseAdvert(houses, handler) {
    for (var i = 0; i < houses.length; i++) {
      handler(mapPins.children[i + 2], houses[i]);
    }
  }

  function addPinClickHandler(pin, building) {
    pin.addEventListener('click', function () {
      mapCard.children[8].innerHTML = '';
      mapCard.children[10].innerHTML = '';
      mapCard.children[0].src = building.author.avatar;
      mapCard.children[2].textContent = building.offer.title;
      mapCard.children[3].textContent = building.offer.address;
      mapCard.children[4].textContent = building.offer.price + ' ₽/ночь';
      mapCard.children[5].textContent = TYPES_TEXTS_MAP[building.offer.type];
      mapCard.children[6].textContent = window.generateRoomsGuests(building.offer.rooms, building.offer.guests);
      mapCard.children[7].textContent = 'Заезд после ' + building.offer.checkin + ', выезд до ' + building.offer.checkout;
      window.getFeaturesToDOM(mapCard.children[8], building.offer.features);
      mapCard.children[9].textContent = building.offer.description;
      window.getPhotosToDOM(mapCard.children[10], building.offer.photos);
    });
  }

  window.data = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESCAPE_KEYCODE: ESCAPE_KEYCODE,
    mapPinMain: mapPinMain,
    cardGlobal: cardGlobal,
    adForm: adForm,
    mapPins: mapPins,
    adds: adds,
    mapCard: mapCard
  };
})();
