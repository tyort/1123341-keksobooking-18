/* eslint-disable no-redeclare */
/* eslint-disable no-console */
'use strict';

(function () {
  var selectRooms = document.getElementById('room_number');
  var selectGuests = document.getElementById('capacity');
  var type = document.getElementById('type');
  var options = selectGuests.getElementsByTagName('option');
  var mapPinMain = document.querySelector('.map__pin--main');
  var TYPES_PRICES_MAP = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  selectRooms.addEventListener('change', function () {
    for (var j = 1; j < 4; j++) {
      getFlatAmount(j);
    }

    function getFlatAmount(flatAmount) {
      if (Number(selectRooms.value) === flatAmount && Number(selectRooms.value) !== 100) {
        getRefreshAttribute(selectGuests);
        selectGuests.value = 1;
        for (var i = 0; i < options.length; i++) {
          options[i].disabled = Number(options[i].value) > Math.ceil(flatAmount * 1.5);
        }
      }
    }

    if (Number(selectRooms.value) === 100) {
      selectGuests.value = 100;
      getRefreshAttribute(selectGuests);
      for (var i = 0; i < options.length; i++) {
        options[i].disabled = Number(options[i].value) < 100;
      }
    }
  });


  type.addEventListener('change', function () {
    var selectedType = document.getElementById('type').value;
    document.getElementById('price').min = TYPES_PRICES_MAP[selectedType];
  });

  function getRefreshAttribute(array) {
    for (var m = 0; m < array.children.length; m++) {
      array.children[m].removeAttribute('disabled');
    }
  }

  window.data.adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.data.adForm), function () {
      window.data.adForm.classList.add('ad-form--disabled');
      window.data.cardGlobal.classList.add('map--faded');
      mapPinMain.style.left = 520 + 'px';
      mapPinMain.style.top = 320 + 'px';
      window.fillAdress(parseInt(mapPinMain.style.left, 10), parseInt(mapPinMain.style.top, 10), window.data.adds);
      window.data.adForm.reset();

    });
    evt.preventDefault();
  });

  // function wwefewfefe() {
  //   for (var i = 2; i < mapPins.children.length; i++) {
  //     mapPins.children[i].classList.add('delete_advert');
  //   }
  // }
})();
