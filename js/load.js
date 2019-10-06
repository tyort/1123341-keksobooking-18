'use strict';

(function () {
  var URLget = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = 10000; // 10s
    xhr.open('GET', URLget);
    xhr.send();
  };


  var URLpost = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URLpost);
    xhr.send(data);
  };


  window.fillAdress = function (x, y, element) {
    var part = 'острого конца';
    var axisX = x + 35;
    var axisY = y + 79;
    if (window.data.cardGlobal.classList.contains('map--faded')) {
      part = 'центра';
      axisX = x + 35;
      axisY = y + 35;
    }
    var adressText = axisX + ' расстояние до ' + part + ' по горизонтали, ' + axisY + ' расстояние до ' + part + ' по вертикали';
    element.setAttribute('value', adressText);
  };

  window.generateRoomsGuests = function (rooms, guests) {
    var part = 'а';
    if (rooms > 1 && rooms < 5) {
      part = 'ы';
    }
    if (rooms >= 5) {
      part = '';
    }
    var partTwo = 'я';
    if (guests > 1) {
      partTwo = 'ей';
    }
    return rooms + ' комнат' + part + ' для ' + guests + ' гост' + partTwo;
  };

  window.getFeaturesToDOM = function (list, features) {
    for (var i = 0; i < features.length; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'popup__feature popup__feature--' + features[i];
      list.appendChild(newElement);
    }
  };

  window.getPhotosToDOM = function (list, photos) {
    for (var i = 0; i < photos.length; i++) {
      var newElement = document.createElement('img');
      newElement.setAttribute('src', photos[i]);
      newElement.className = 'popup__photo';
      newElement.setAttribute('width', 45);
      newElement.setAttribute('height', 40);
      newElement.setAttribute('alt', 'Фотография жилья');
      list.appendChild(newElement);
    }
  };
})();

