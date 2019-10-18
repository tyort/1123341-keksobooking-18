'use strict';

(function () {

  window.data.adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(window.data.adForm), function () {
      window.data.mapPinMain.style.left = 570 + 'px';
      window.data.mapPinMain.style.top = 315 + 'px';
      window.fillAdress(570, 315, window.data.adds);
      window.data.adForm.reset();
      window.addClassName('map__pin', 1, 'delete_advert');
      window.addClassName('map__card', 0, 'delete_advert');
      window.addClassName('ad-form', 0, 'ad-form--disabled');
      window.addClassName('map', 0, 'map--faded');
      onSuccessReport();
    });
    evt.preventDefault();
  });

  function onSuccessReport() {
    var templateError = document.querySelector('#success').content.querySelector('div');
    var node = templateError.cloneNode(true);
    document.getElementsByTagName('main')[0].insertAdjacentElement('afterbegin', node);

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
})();
