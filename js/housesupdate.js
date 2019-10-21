'use strict';

(function () {
  var ANY = 'any';
  var typeOfBuild = ANY;
  var priceOfBuild = ANY;
  var roomOfBuild = ANY;
  var guestOfBuild = ANY;
  var featureOfBuild = [];
  var BUILDINGS = [];

  window.housesupdate = {
    onHousesSuccess: function (houses) {
      BUILDINGS = houses;
      updateHouses();
      window.data.renderPinHouses(BUILDINGS);
    }
  };

  function updateHouses() {
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
  }


  window.onFeatureChange = window.debounce(function (par) {
    featureOfBuild = par;
    updateHouses();
  });

  window.onTypeChange = window.debounce(function (par) {
    typeOfBuild = par;
    updateHouses();
  });

  window.onPriceChange = window.debounce(function (par) {
    priceOfBuild = par;
    updateHouses();
  });

  window.onRoomChange = window.debounce(function (par) {
    roomOfBuild = par;
    updateHouses();
  });

  window.onGuestChange = window.debounce(function (par) {
    guestOfBuild = par;
    updateHouses();
  });


})();
