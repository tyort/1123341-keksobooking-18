'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var interiorChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewInterior = document.querySelector('.ad-form__photo img');

  avatarChooser.addEventListener('change', function () {
    onPhotoChange(avatarChooser, previewAvatar);
  });
  interiorChooser.addEventListener('change', function () {
    onPhotoChange(interiorChooser, previewInterior);
  });

  function onPhotoChange(knob, image) {
    var file = knob.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        image.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

})();

