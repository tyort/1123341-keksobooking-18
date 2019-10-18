'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var pinLocation = new Coordinate(new Rect(0, 100, 1140, 630), 570, 315);

  window.data.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    activatePage();

    var startCoords = new Coordinate(null, evt.clientX, evt.clientY);
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = new Coordinate(null, startCoords.X - moveEvt.clientX, startCoords.Y - moveEvt.clientY);
      pinLocation.setX(window.data.mapPinMain.offsetLeft - shift.X);
      pinLocation.setY(window.data.mapPinMain.offsetTop - shift.Y);
      startCoords = new Coordinate(null, moveEvt.clientX, moveEvt.clientY);

      window.data.mapPinMain.style.left = Number(pinLocation.X) + 'px';
      window.data.mapPinMain.style.top = Number(pinLocation.Y) + 'px';

      window.fillAdress(Number(pinLocation.X), Number(pinLocation.Y), window.data.adds);
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
      window.fillAdress(pinLocation.X, pinLocation.Y, window.data.adds);
    }
  });

  window.addEventListener('load', function () {
    window.fillAdress(pinLocation.X, pinLocation.Y, window.data.adds);
    getDisabledForm(window.data.adForm);
    getDisabledForm(mapFilters);
  });

  function activatePage() {
    getEnabledForm(window.data.adForm);
    getEnabledForm(mapFilters);
    window.data.cardGlobal.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');
    window.deleteClassName('map__pin', 0, 'delete_advert');
    window.fillAdress(pinLocation.X, pinLocation.Y, window.data.adds);
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

  function Rect(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }

  function Coordinate(constraints, x, y) {
    this.X = x;
    this.Y = y;
    this._constraints = constraints;
  }

  Coordinate.prototype.setX = function (x) {
    if (x >= this._constraints.left &&
      x <= this._constraints.right) {
      this.X = x;
    }
  };

  Coordinate.prototype.setY = function (y) {
    if (y >= this._constraints.top &&
      y <= this._constraints.bottom) {
      this.Y = y;
    }
  };
})();


