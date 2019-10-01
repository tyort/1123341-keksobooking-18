/* eslint-disable no-console */
'use strict';

(function () {
  var templateMarker = document.querySelector('#pin').content.querySelector('button');
  var fragmentMarker = document.createDocumentFragment();

  for (var i = 0; i < window.data.BUILDINGS.length; i++) {
    renderMarker(templateMarker.cloneNode(true), window.data.BUILDINGS[i]);
  }

  window.data.mapPins.appendChild(fragmentMarker);

  function renderMarker(ObjMarker, apartment) {
    ObjMarker.style = 'left: ' + apartment.location.x + 'px; top: ' + apartment.location.y + 'px;';
    ObjMarker.children[0].src = apartment.author.avatar;
    ObjMarker.children[0].alt = apartment.offer.title;
    fragmentMarker.appendChild(ObjMarker);
  }
  // console.log(templateMarker);
  // console.log(window.data.mapPins);
})();
