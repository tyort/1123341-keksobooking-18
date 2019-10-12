/* eslint-disable no-console */
'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');

  window.fillAdress(parseInt(window.data.mapPinMain.style.left, 10), parseInt(window.data.mapPinMain.style.top, 10), window.data.adds);
  getDisabledForm(window.data.adForm);
  getDisabledForm(mapFilters);

  window.data.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activatePage();

    window.fillAdress(parseInt(window.data.mapPinMain.style.left, 10), parseInt(window.data.mapPinMain.style.top, 10), window.data.adds);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      var newLocationY = window.data.mapPinMain.offsetTop - shift.y;
      var newLocationX = window.data.mapPinMain.offsetLeft - shift.x;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (newLocationX < 0) {
        window.data.mapPinMain.style.left = 0 + 'px';
      } else if (newLocationX > 1140) {
        window.data.mapPinMain.style.left = 1140 + 'px';
      } else {
        window.data.mapPinMain.style.left = newLocationX + 'px';
      }

      if (newLocationY < 100) {
        window.data.mapPinMain.style.top = 100 + 'px';
      } else if (newLocationY > 630) {
        window.data.mapPinMain.style.top = 630 + 'px';
      } else {
        window.data.mapPinMain.style.top = newLocationY + 'px';
      }

      window.fillAdress(parseInt(window.data.mapPinMain.style.left, 10), parseInt(window.data.mapPinMain.style.top, 10), window.data.adds);

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.data.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activatePage();
      window.fillAdress(parseInt(window.data.mapPinMain.style.left, 10), parseInt(window.data.mapPinMain.style.top, 10), window.data.adds);
    }
  });

  function activatePage() {
    getEnabledForm(window.data.adForm);
    getEnabledForm(mapFilters);
    window.data.cardGlobal.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');
    window.deleteClassName('map__card', 0, 'delete_advert');
    window.deleteClassName('map__pin', 0, 'delete_advert');
  }

  function getDisabledForm(form) {
    for (var j = 0; j < form.children.length; j++) {
      if (!form.children[j].getAttribute('disabled')) {
        form.children[j].setAttribute('disabled', 'disabled');
      }
    }
  }

  function getEnabledForm(form) {
    for (var j = 0; j < form.children.length; j++) {
      if (form.children[j].getAttribute('disabled')) {
        form.children[j].removeAttribute('disabled');
      }
    }
  }

})();
