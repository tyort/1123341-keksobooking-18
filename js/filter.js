/* eslint-disable no-console */
'use strict';

(function () {
  var typeOfBuild;
  var priceOfBuild;
  var roomOfBuild;
  var maxPrice;
  var minPrice;
  var pricesLimit = [{name: 'any', min: 0, max: 1000000000}, {name: 'low', min: 0, max: 10000}, {name: 'middle', min: 10000, max: 50000}, {name: 'high', min: 50000, max: 1000000000}];
  var BUILDINGS = [];
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');

  function upadateHouses() {
    var TYPEBUILDINGS = BUILDINGS.filter(function (it) {
      return it.offer.type === typeOfBuild;
    });
    var ARRAYfirst = typeOfBuild === 'any' ? BUILDINGS : TYPEBUILDINGS;

    var PRICEBUILDINGS = ARRAYfirst.filter(function (it) {
      return it.offer.price > minPrice && it.offer.price < maxPrice;
    });

    var ROOMBUILDINGS = PRICEBUILDINGS.filter(function (it) {
      return it.offer.rooms === Number(roomOfBuild);
    });
    var ARRAYsecond = roomOfBuild === 'any' ? PRICEBUILDINGS : ROOMBUILDINGS;
    console.log(ROOMBUILDINGS);

    var GUESTBUILDINGS = ARRAYsecond.filter(function (it))

    window.data.renderPinHouses(ARRAYsecond);
    window.deleteClassName('map__pin', 0, 'delete_advert');

  }


  housingType.addEventListener('change', function () {
    typeOfBuild = housingType.value;
    upadateHouses();
  });

  housingPrice.addEventListener('change', function () {
    priceOfBuild = pricesLimit.filter(function (it) {
      return it.name === housingPrice.value;
    });
    maxPrice = priceOfBuild[0].max;
    minPrice = priceOfBuild[0].min;
    upadateHouses();

  });

  housingRooms.addEventListener('change', function () {
    roomOfBuild = housingRooms.value;
    upadateHouses();
  });

  housingGuests.addEventListener('change', function () {
    guestOfBuild = housingGuests.value;
    upadateHouses();
  });

  function onHousesSuccess(houses) {
    BUILDINGS = houses;
    upadateHouses();
    window.data.renderPinHouses(BUILDINGS);
  }

  window.load(onHousesSuccess);


  // var checkbox = document.getElementById('filter-wifi');
  // checkbox.addEventListener('change', function () {
  //   if (checkbox.checked) {
  //     console.log('you need to be fluent in English to apply for the job');
  //   } else {
  //     console.log('');
  //   }
  // });


})();
