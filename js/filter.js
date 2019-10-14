/* eslint-disable no-console */
'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

})();

(function () {
  var typeOfBuild = 'any';
  var priceOfBuild = 'any';
  var roomOfBuild = 'any';
  var guestOfBuild = 'any';
  var featureOfBuild = [];
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
    var pinsAfterFilter = BUILDINGS.slice();

    pinsAfterFilter = typeOfBuild === 'any'
      ? pinsAfterFilter
      : pinsAfterFilter.filter(function (it) {
        return it.offer.type === typeOfBuild;
      });

    pinsAfterFilter = priceOfBuild === 'any'
      ? pinsAfterFilter
      : pinsAfterFilter.filter(function (it) {
        return it.offer.price >= minPrice && it.offer.price <= maxPrice;
      });

    pinsAfterFilter = roomOfBuild === 'any'
      ? pinsAfterFilter
      : pinsAfterFilter.filter(function (it) {
        return it.offer.rooms === Number(roomOfBuild);
      });

    pinsAfterFilter = guestOfBuild === 'any'
      ? pinsAfterFilter
      : pinsAfterFilter.filter(function (it) {
        return it.offer.guests === Number(guestOfBuild);
      });

    pinsAfterFilter = pinsAfterFilter.filter(function (it) {
      return featureOfBuild.every(function (item) {
        return it.offer.features.includes(item);
      });
    });

    window.data.renderPinHouses(pinsAfterFilter);
    window.deleteClassName('map__pin', 0, 'delete_advert');
  }
  var lastTimeout;
  housingType.addEventListener('change', function () {
    typeOfBuild = housingType.value;

    window.debounce(upadateHouses);
  });

  housingPrice.addEventListener('change', function () {
    priceOfBuild = pricesLimit.filter(function (it) {
      return it.name === housingPrice.value;
    });
    maxPrice = priceOfBuild[0].max;
    minPrice = priceOfBuild[0].min;

    window.debounce(upadateHouses);
  });

  housingRooms.addEventListener('change', function () {
    roomOfBuild = housingRooms.value;

    window.debounce(upadateHouses);
  });

  housingGuests.addEventListener('change', function () {
    guestOfBuild = housingGuests.value;

    window.debounce(upadateHouses);
  });

  function renderFeature(feature) {
    feature.addEventListener('change', function () {
      if (feature.checked && !featureOfBuild.includes(feature.value)) {
        featureOfBuild.push(feature.value);
      } else {
        featureOfBuild.splice(featureOfBuild.indexOf(feature.value), 1);
      }

      window.debounce(upadateHouses);
    });
  }

  console.log(lastTimeout);
  function onHousesSuccess(houses) {
    BUILDINGS = houses;
    upadateHouses();
    window.data.renderPinHouses(BUILDINGS);
  }

  window.load(onHousesSuccess);

})();
