/* eslint-disable no-console */
'use strict';

(function () {
  var ANY = 'any';
  var typeOfBuild = ANY;
  var priceOfBuild = ANY;
  var roomOfBuild = ANY;
  var guestOfBuild = ANY;
  var featureOfBuild = [];
  var BUILDINGS = [];

  function upadateHouses() {
    var pinsAfterFilter = BUILDINGS.slice();

    pinsAfterFilter = typeOfBuild === ANY
      ? pinsAfterFilter
      : pinsAfterFilter.filter(function (it) {
        return it.offer.type === typeOfBuild;
      });

    pinsAfterFilter = priceOfBuild === ANY
      ? pinsAfterFilter
      : pinsAfterFilter.filter(function (it) {
        return it.offer.price >= priceOfBuild.min && it.offer.price <= priceOfBuild.max;
      });

    pinsAfterFilter = roomOfBuild === ANY
      ? pinsAfterFilter
      : pinsAfterFilter.filter(function (it) {
        return it.offer.rooms === Number(roomOfBuild);
      });

    pinsAfterFilter = guestOfBuild === ANY
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


  window.onFeatureChange = window.debounce(function (par) {
    featureOfBuild = par;
    upadateHouses();
  });

  window.onTypeChange = window.debounce(function (par) {
    typeOfBuild = par;
    upadateHouses();
  });

  window.onPriceChange = window.debounce(function (par) {
    priceOfBuild = par;
    upadateHouses();
  });

  window.onRoomChange = window.debounce(function (par) {
    roomOfBuild = par;
    upadateHouses();
  });

  window.onGuestChange = window.debounce(function (par) {
    guestOfBuild = par;
    upadateHouses();
  });

  function onHousesSuccess(houses) {
    BUILDINGS = houses;
    upadateHouses();
    window.data.renderPinHouses(BUILDINGS);
  }

  window.load(onHousesSuccess);

})();
