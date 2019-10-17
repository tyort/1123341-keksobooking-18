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

    var startCoords = new Coordinate(null, evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = new Coordinate(null, startCoords.X - moveEvt.clientX, startCoords.Y - moveEvt.clientY);
      var newLocation = new Coordinate(new Rect(0, 100, 1140, 630), window.data.mapPinMain.offsetLeft - shift.X, window.data.mapPinMain.offsetTop - shift.Y);
      startCoords = new Coordinate(null, moveEvt.clientX, moveEvt.clientY);
      
      window.data.mapPinMain.style.left = Number(newLocation.X) + 'px'; // todo не ограничивает движение маркера
      window.data.mapPinMain.style.top = Number(newLocation.Y) + 'px'; // todo не ограничивает движение маркера

      // if (newLocation.X < 0) {
      //   window.data.mapPinMain.style.left = 0 + 'px';
      // } else if (newLocation.X > 1140) {
      //   window.data.mapPinMain.style.left = 1140 + 'px';
      // } else {
      //   window.data.mapPinMain.style.left = newLocation.X + 'px';
      // }

      // if (newLocation.Y < 100) {
      //   window.data.mapPinMain.style.top = 100 + 'px';
      // } else if (newLocation.Y > 630) {
      //   window.data.mapPinMain.style.top = 630 + 'px';
      // } else {
      //   window.data.mapPinMain.style.top = newLocation.Y + 'px';
      // }

      window.fillAdress(Number(newLocation.X), Number(newLocation.Y), window.data.adds);

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
    window.deleteClassName('map__pin', 0, 'delete_advert');
    window.fillAdress(parseInt(window.data.mapPinMain.style.left, 10), parseInt(window.data.mapPinMain.style.top, 10), window.data.adds);
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


