'use strict';

(function () {
  var URL_GET_OFFERS = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE_OFFER = 'https://js.dump.academy/keksobooking';
  var waitLoadTime = 10000; // мс
  var waitUploadtime = 3000; // мс
  var answerFromServer = 200;

  function onHousesError() {
    var templateError = document.querySelector('#error').content.querySelector('div');
    var node = templateError.cloneNode(true);
    document.getElementsByTagName('main')[0].insertAdjacentElement('afterbegin', node);
    return node;
  }

  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === answerFromServer) {
        onSuccess(xhr.response);
      } else {
        onHousesError();
      }
    });
    xhr.addEventListener('error', function () {
      onHousesError();
    });
    xhr.addEventListener('timeout', function () {
      onHousesError();
    });

    xhr.timeout = waitLoadTime;
    xhr.open('GET', URL_GET_OFFERS);
    xhr.send();
  };


  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === answerFromServer) {
        onSuccess(xhr.response);
      } else {
        onHousesError();
      }
    });
    xhr.addEventListener('error', function () {
      onHousesError();
    });
    xhr.addEventListener('timeout', function () {
      onHousesError();
    });

    xhr.timeout = waitUploadtime;
    xhr.open('POST', URL_SAVE_OFFER);
    xhr.send(data);
  };


  window.fillAdress = function (x, y, element) {
    var part = 'острого конца';
    var axisX = x + 35;
    var axisY = y + 79;
    if (window.data.cardGlobal.classList.contains('map--faded')) {
      part = 'центра';
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


  window.addClassName = function (mainName, firstIndex, className) {
    var element = document.getElementsByClassName(mainName);
    for (var i = firstIndex; i < element.length; i++) {
      element[i].classList.add(className);
    }
  };


  window.deleteClassName = function (mainName, firstIndex, className) {
    var element = document.getElementsByClassName(mainName);
    for (var i = firstIndex; i < element.length; i++) {
      element[i].classList.remove(className);
    }
  };

  window.getDisabledForm = function (form) {
    for (var j = 0; j < form.children.length; j++) {
      if (!form.children[j].getAttribute('disabled')) {
        form.children[j].setAttribute('disabled', 'disabled');
      }
    }
  };

  window.getEnabledForm = function (form) {
    for (var j = 0; j < form.children.length; j++) {
      if (form.children[j].getAttribute('disabled')) {
        form.children[j].removeAttribute('disabled');
      }
    }
  };

})();

