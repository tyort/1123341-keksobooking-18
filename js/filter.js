/* eslint-disable no-console */
'use strict';

(function () {
  var typeofBuild;
  var BUILDINGS = [];
  var housingType = document.getElementById('housing-type');

  function upadateHouses() {
    var sameTypeHouse = BUILDINGS.filter(function (it) {
      return it.offer.type === typeofBuild;
    });
    window.data.renderPinHouses(sameTypeHouse);
  }

  function onHousesSuccess(houses) {
    BUILDINGS = houses;
    upadateHouses();
  }

  housingType.addEventListener('change', function () {
    typeofBuild = housingType.value;
    upadateHouses();
  });

  window.load(onHousesSuccess);
})();

