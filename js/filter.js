'use strict';

(function () {

  var featureOfBuild = [];
  var pricesLimit = [
    {
      name: 'any', min: 0, max: 1000000000
    }, {
      name: 'low', min: 0, max: 10000
    }, {
      name: 'middle', min: 10000, max: 50000
    }, {
      name: 'high', min: 50000, max: 1000000000
    }
  ];

  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var table = document.getElementById('housing-features');
  var housingFeatures = Array.from(table.getElementsByTagName('input'));


  for (var i = 0; i < housingFeatures.length; i++) {
    addFeatureEventListener(housingFeatures[i]);
  }

  housingType.addEventListener('change', function () {
    window.onTypeChange(housingType.value);
  });

  housingPrice.addEventListener('change', function () {
    var priceOfBuild = pricesLimit.find(function (it) {
      return it.name === housingPrice.value;
    });
    window.onPriceChange(priceOfBuild);
  });

  housingRooms.addEventListener('change', function () {
    window.onRoomChange(housingRooms.value);
  });

  housingGuests.addEventListener('change', function () {
    window.onGuestChange(housingGuests.value);
  });

  function addFeatureEventListener(feature) {
    feature.addEventListener('change', function () {
      if (feature.checked && !featureOfBuild.includes(feature.value)) {
        featureOfBuild.push(feature.value);
      } else {
        featureOfBuild.splice(featureOfBuild.indexOf(feature.value), 1);
      }
      window.onFeatureChange(featureOfBuild);
    });
  }

})();
