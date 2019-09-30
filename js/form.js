'use strict';

(function () {
  var selectRooms = window.data.adForm.children[6].children[1];
  var selectGuests = window.data.adForm.children[7].children[1];

  selectRooms.addEventListener('change', function () {
    var oneRoom = selectRooms.children[0];
    var twoRoom = selectRooms.children[1];
    var threeRoom = selectRooms.children[2];
    var hundredRoom = selectRooms.children[3];
    var fiveCats = selectGuests.children[0];
    var fourCats = selectGuests.children[1];
    var threeCats = selectGuests.children[2];
    var twoCats = selectGuests.children[3];
    var oneCats = selectGuests.children[4];
    var manyCats = selectGuests.children[5];
    if (oneRoom.selected) {
      getRefreshAttribute(selectGuests, 'disabled', 'selected');
      twoCats.setAttribute('selected', 'selected');
      fiveCats.setAttribute('disabled', 'disabled');
      fourCats.setAttribute('disabled', 'disabled');
      threeCats.setAttribute('disabled', 'disabled');
      manyCats.setAttribute('disabled', 'disabled');
    }
    if (twoRoom.selected) {
      getRefreshAttribute(selectGuests, 'disabled', 'selected');
      threeCats.setAttribute('selected', 'selected');
      fiveCats.setAttribute('disabled', 'disabled');
      fourCats.setAttribute('disabled', 'disabled');
      manyCats.setAttribute('disabled', 'disabled');
    }
    if (threeRoom.selected) {
      getRefreshAttribute(selectGuests, 'disabled', 'selected');
      fiveCats.setAttribute('selected', 'selected');
      manyCats.setAttribute('disabled', 'disabled');
    }
    if (hundredRoom.selected) {
      getRefreshAttribute(selectGuests, 'disabled', 'selected');
      manyCats.setAttribute('selected', 'selected');
      fiveCats.setAttribute('disabled', 'disabled');
      fourCats.setAttribute('disabled', 'disabled');
      threeCats.setAttribute('disabled', 'disabled');
      twoCats.setAttribute('disabled', 'disabled');
      oneCats.setAttribute('disabled', 'disabled');
    }
  });

  window.data.adForm.children[3].children[1].addEventListener('change', function () {
    var type = window.data.adForm.children[3].children[1];
    var price = window.data.adForm.children[4].children[1];
    if (type.children[0].selected) {
      price.min = 0;
    }
    if (type.children[1].selected) {
      price.min = 1000;
    }
    if (type.children[2].selected) {
      price.min = 5000;
    }
    if (type.children[3].selected) {
      price.min = 10000;
    }
  });

  // adForm.children[5].children[2].addEventListener('change', function () {
  //   console.log('жопа');
  //   getRefreshAttribute(adForm.children[5].children[1], 'selected', 'selected');
  //   addActionChangeHandler(adForm.children[5].children[2], adForm.children[5].children[1]);
  // });

  // function addActionChangeHandler(actionOne, actionTwo) {
  //   if (actionOne.children[0].selected) {
  //     getRefreshAttribute(actionTwo, 'selected', 'selected');
  //     actionTwo.children[0].setAttribute('selected', 'selected');
  //   }
  //   if (actionOne.children[1].selected) {
  //     getRefreshAttribute(actionTwo, 'selected', 'selected');
  //     actionTwo.children[1].setAttribute('selected', 'selected');
  //   }
  //   if (actionOne.children[2].selected) {
  //     getRefreshAttribute(actionTwo, 'selected', 'selected');
  //     actionTwo.children[2].setAttribute('selected', 'selected');
  //   }
  // }

  // console.log(adForm.children[5].children[1]);
  // console.log(adForm.children[5].children[2]);

  function getRefreshAttribute(item, attrOne, attrTwo) {
    for (var j = 0; j < item.length; j++) {
      item.children[j].removeAttribute(attrOne);
      item.children[j].removeAttribute(attrTwo);
    }
  }

})();
