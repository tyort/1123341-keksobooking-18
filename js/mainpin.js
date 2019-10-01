'use strict';

(function () {
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

  mapPinMain.addEventListener('mousedown', function () {
    activatePage();
    fillAdress(markEdgeXcorrect, markEdgeYcorrect);
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
