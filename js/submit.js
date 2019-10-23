'use strict';

(function () {
  var resetForm = document.querySelector('.ad-form__reset');

  window.data.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(window.data.adForm), onSuccessReport);
  });

  document.addEventListener('keydown', function (evt) {
    var element = document.getElementsByClassName('error')[0];
    if (evt.keyCode === window.data.ESCAPE_KEYCODE && element !== undefined) {
      element.remove();
    }
  });

  document.addEventListener('click', function () {
    var element = document.getElementsByClassName('error')[0];
    if (element !== undefined) {
      element.remove();
    }
  });

  resetForm.addEventListener('click', function () {
    onInactivatePage();
  });

  function onSuccessReport() {
    var templateError = document.querySelector('#success').content.querySelector('div');
    var node = templateError.cloneNode(true);
    document.getElementsByTagName('main')[0].insertAdjacentElement('afterbegin', node);
    onInactivatePage();

    document.addEventListener('keydown', function (evt) {
      var element = document.getElementsByClassName('success')[0];
      if (evt.keyCode === window.data.ESCAPE_KEYCODE && element !== undefined) {
        element.remove();
      }
    });

    document.addEventListener('click', function () {
      var element = document.getElementsByClassName('success')[0];
      if (element !== undefined) {
        element.remove();
      }
    });
    return node;
  }

  function onInactivatePage() {
    window.addClassName('map', 0, 'map--faded');
    window.data.mapPinMain.style.left = window.data.PIN_START_X + 'px';
    window.data.mapPinMain.style.top = window.data.PIN_START_Y + 'px';
    window.fillAdress(window.data.PIN_START_X, window.data.PIN_START_Y, window.data.adds);
    window.data.adForm.reset();
    window.data.mapFilters.reset();
    window.addClassName('map__card', 0, 'delete_advert');
    window.addClassName('ad-form', 0, 'ad-form--disabled');
    window.getDisabledForm(window.data.adForm);
    window.getDisabledForm(window.data.mapFilters);
    window.data.removeAllPins();
    window.data.previewAvatar.src = 'img/muffin-grey.svg';
    window.data.previewInterior.src = 'img/muffin-grey.svg';
  }

})();
