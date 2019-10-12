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
    window.data.renderPinHouses(typeofBuild === 'any' ? BUILDINGS : sameTypeHouse);


    window.deleteClassName('map__pin', 0, 'delete_advert');
  }

  function onHousesSuccess(houses) {
    BUILDINGS = houses;
    upadateHouses();
    window.data.renderPinHouses(BUILDINGS);
  }

  housingType.addEventListener('change', function () {
    typeofBuild = housingType.value;
    upadateHouses();
  });

  window.load(onHousesSuccess);


  // var checkbox = document.getElementById('filter-wifi');
  // checkbox.addEventListener('change', function () {
  //   if (checkbox.checked) {
  //     console.log('you need to be fluent in English to apply for the job');
  //   } else {
  //     console.log('иди на хер');
  //   }
  // });


})();
