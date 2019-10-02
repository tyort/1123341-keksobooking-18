/* eslint-disable no-console */
'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var markCenterXcorrect = parseInt(mapPinMain.style.left, 10) + 35;
  var markCenterYcorrect = parseInt(mapPinMain.style.top, 10) + 35;
  var markEdgeXcorrect = parseInt(mapPinMain.style.left, 10) + 35;
  var markEdgeYcorrect = parseInt(mapPinMain.style.top, 10) + 79;
  var adds = document.querySelector('#address');

  fillAdress(markCenterXcorrect, markCenterYcorrect);
  getDisabledForm(window.data.adForm);
  getDisabledForm(mapFilters);

  // mapPins.offsetHeight = 400;

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activatePage();
    fillAdress((mapPinMain.style.left, 10) + 35, parseInt(mapPinMain.style.top, 10) + 79);

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
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mapPinMain.style.top = mapPinMain.offsetTop - shift.y + 'px';
      mapPinMain.style.left = mapPinMain.offsetLeft - shift.x + 'px';
      fillAdress(parseInt(mapPinMain.style.left, 10) + 35, parseInt(mapPinMain.style.top, 10) + 79);
      console.log(parseInt(mapPinMain.style.left, 10) + 35, parseInt(mapPinMain.style.top, 10) + 79)
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activatePage();
      fillAdress(markEdgeXcorrect, markEdgeYcorrect);
    }
  });

  function activatePage() {
    getEnabledForm(window.data.adForm);
    getEnabledForm(mapFilters);
    window.data.cardGlobal.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');
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

  function fillAdress(x, y) {
    var part = 'острого конца';
    if (window.data.cardGlobal.classList.contains('map--faded')) {
      part = 'центра';
    }
    var adressText = x + ' расстояние до ' + part + ' по горизонтали, ' + y + ' расстояние до ' + part + ' по вертикали';
    adds.setAttribute('placeholder', adressText);
  }
})();
