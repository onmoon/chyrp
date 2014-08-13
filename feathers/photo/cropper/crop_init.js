(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else {
    factory(jQuery);
  }
})(function ($) {
  "use strict";

  function CropAvatar() {
    this.$input = $('#photo_field');
    this.$avatarWrapper = $(".avatar-wrapper");

    this.$w = $('input[name="w"]');
    this.$h = $('input[name="h"]');
    this.$x = $('input[name="x"]');
    this.$y = $('input[name="y"]');

    this.init();
  }

  CropAvatar.prototype = {
    constructor: CropAvatar,

    init: function () {
      this.$input.on("change", $.proxy(this.change, this));
    },

    change: function () {
    var files, file;
      files = this.$input.prop("files");
      if (files.length > 0) {
        file = files[0];
        if (this.isImageFile(file)) {
          this.read(file);
        }
      }
    },
    isImageFile: function (file) {
      if (file.type) {
        return /^image\/\w+$/.test(file.type);
      } else {
        return /\.(jpg|jpeg|png|gif)$/.test(file);
      }
    },
    read: function (file) {
      var self = this,
        fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = function () {
        self.url = this.result;
        self.startCropper();
      };
    },
    startCropper: function () {
      var self = this;
      if (this.active) {
        this.$img.cropper("setImgSrc", this.url);
      } else {
        this.$img = $('<img src="' + this.url + '">');
        this.$avatarWrapper.empty().html(this.$img);
        this.$img.cropper({
          done: function (data) {
            self.$x.val(data.x);
            self.$y.val(data.y);
            self.$w.val(data.width);
            self.$h.val(data.height);
          }
        });
        this.active = true;
      }
    }
  };

  $(function () {
    var ex = new CropAvatar();
  });
});