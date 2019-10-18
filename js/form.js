'use strict';

(function () {
  var selectRooms = document.getElementById('room_number');
  var selectGuests = document.getElementById('capacity');
  var type = document.getElementById('type');
  var options = selectGuests.getElementsByTagName('option');
  var userTitleInput = document.getElementById('title');
  var userPriceInput = document.getElementById('price');

  var TYPES_PRICES_MAP = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  selectRooms.addEventListener('change', function () {
    for (var j = 1; j < 4; j++) {
      getFlatAmount(j);
    }

    function getFlatAmount(flatAmount) {
      if (Number(selectRooms.value) === flatAmount && Number(selectRooms.value) !== 100) {
        getRefreshAttribute(selectGuests);
        selectGuests.value = 1;
        for (var i = 0; i < options.length; i++) {
          options[i].disabled = Number(options[i].value) > Math.ceil(flatAmount * 1.5);
        }
      }
    }

    if (Number(selectRooms.value) === 100) {
      selectGuests.value = 100;
      getRefreshAttribute(selectGuests);
      for (var i = 0; i < options.length; i++) {
        options[i].disabled = Number(options[i].value) < 100;
      }
    }
  });

  type.addEventListener('change', function () {
    var selectedType = type.value;
    document.getElementById('price').min = TYPES_PRICES_MAP[selectedType];
  });

  function getRefreshAttribute(array) {
    for (var m = 0; m < array.children.length; m++) {
      array.children[m].removeAttribute('disabled');
    }
  }

  userTitleInput.addEventListener('invalid', function () {
    if (userTitleInput.validity.tooShort) {
      userTitleInput.setCustomValidity('Не ленись, заполни меня полностью!');
    } else if (userTitleInput.validity.valueMissing) {
      userTitleInput.setCustomValidity('Не оставляй меня пустым');
    } else {
      userTitleInput.setCustomValidity('');
    }
  });

  userTitleInput.addEventListener('input', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Поднажми, друг. Еще несколько символов!');
    } else {
      target.setCustomValidity('');
    }
  });

  userPriceInput.addEventListener('invalid', function () {
    if (userPriceInput.validity.rangeUnderflow) {
      userPriceInput.setCustomValidity('Денег нет - спи на улице!');
    } else if (userPriceInput.validity.rangeOverflow) {
      userPriceInput.setCustomValidity('Найди подешевле и одолжи мне денег');
    } else if (userPriceInput.validity.valueMissing) {
      userPriceInput.setCustomValidity('А деньги? А если найду?');
    } else {
      userPriceInput.setCustomValidity('');
    }
  });

})();
