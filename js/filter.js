/* eslint-disable no-console */
'use strict';

(function () {
  var typeOfBuild;
  var priceOfBuild;
  var roomOfBuild;
  var guestOfBuild;
  var checkedFeatures;
  var maxPrice;
  var minPrice;
  // eslint-disable-next-line object-curly-spacing
  var pricesLimit = [{ name: 'any', min: 0, max: 1000000000 }, { name: 'low', min: 0, max: 10000 }, { name: 'middle', min: 10000, max: 50000 }, { name: 'high', min: 50000, max: 1000000000 }];
  var BUILDINGS = [];
  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var table = document.getElementById('housing-features');
  var housingFeatures = Array.from(table.getElementsByTagName('input'));

  for (var i = 0; i < housingFeatures.length; i++) {
    renderFeature(housingFeatures[i]);
  }


  function upadateHouses() {
    // console.log(BUILDINGS[0].offer.features.includes(checkedFeatures[0].value));
    // console.log(BUILDINGS[0].offer.features.includes(checkedFeatures[1].value));
    // console.log(BUILDINGS[0].offer.features.includes(checkedFeatures[2].value));
    // console.log(BUILDINGS[0].offer.features.includes(checkedFeatures[3].value));
    // console.log(BUILDINGS[0].offer.features.includes(checkedFeatures[4].value));
    // console.log(BUILDINGS[0].offer.features.includes(checkedFeatures[5].value));

    var TYPEBUILDINGS = BUILDINGS.filter(function (it) {
      return it.offer.type === typeOfBuild;
    });
    var ARRAYfirst = typeOfBuild === 'any' ? BUILDINGS : TYPEBUILDINGS;

    var PRICEBUILDINGS = ARRAYfirst.filter(function (it) {
      return it.offer.price >= minPrice && it.offer.price <= maxPrice;
    });

    var ROOMBUILDINGS = PRICEBUILDINGS.filter(function (it) {
      return it.offer.rooms === Number(roomOfBuild);
    });
    var ARRAYsecond = roomOfBuild === 'any' ? PRICEBUILDINGS : ROOMBUILDINGS;

    var GUESTBUILDINGS = ARRAYsecond.filter(function (it) {
      return it.offer.guests === Number(guestOfBuild);
    });
    var ARRAYthird = guestOfBuild === 'any' ? ARRAYsecond : GUESTBUILDINGS;

    window.data.renderPinHouses(ARRAYthird);
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


  var sched = {
    'wifi': true,
    'dishwasher': true,
    'parking': true,
    'washer': true,
    'elevator': true,
    'conditioner': true
  };

  function renderFeature(feature) {
    feature.addEventListener('change', function () {
      yesOrno = feature.checked ? true : false;
      console.log(yesOrno);
      upadateHouses();
    });
  }

  function onHousesSuccess(houses) {
    BUILDINGS = houses;
    upadateHouses();
    window.data.renderPinHouses(BUILDINGS);
  }

  window.load(onHousesSuccess);

})();

// table.addEventListener('change', function () {
//   checkedFeatures = housingFeatures.filter(function (it) {
//     return it.checked === true;
//   });
//   upadateHouses();
// });


// housingFeatures[0]
