'use strict';

(function () {

  var pinLocation = new Coordinate(new Rect(0, 100, 1140, 630), window.data.PIN_START_X, window.data.PIN_START_Y);

  window.data.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

  window.data.mapPinMain.addEventListener('click', function () {
    if (window.data.cardGlobal.classList.contains('map--faded')) {
      activatePage();
    }
  });

  window.data.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      activatePage();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ESCAPE_KEYCODE && !window.data.mapCard.classList.contains('delete_advert')) {
      window.data.mapCard.classList.add('delete_advert');
    }
  });

  window.data.advertClose.addEventListener('click', function () {
    if (!window.data.mapCard.classList.contains('delete_advert')) {
      window.data.mapCard.classList.add('delete_advert');
    }
  });

  window.data.mapFiltersContainer.addEventListener('click', function () {
    if (!window.data.mapCard.classList.contains('delete_advert')) {
      window.data.mapCard.classList.add('delete_advert');
    }
  });

  window.addEventListener('load', function () {
    window.fillAdress(window.data.PIN_START_X, window.data.PIN_START_Y, window.data.adds);
    window.getDisabledForm(window.data.adForm);
    window.getDisabledForm(window.data.mapFilters);
  });

  function activatePage() {
    window.load(loadSuccess);
    window.getEnabledForm(window.data.adForm);
    window.getEnabledForm(window.data.mapFilters);
    window.data.cardGlobal.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');
    window.fillAdress(window.data.PIN_START_X, window.data.PIN_START_Y, window.data.adds);
  }

  function loadSuccess(houses) {
    window.housesupdate.onHousesSuccess(houses);
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


