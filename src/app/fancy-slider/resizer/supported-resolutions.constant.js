(function () {
  'use strict';

  angular
    .module('specific.fancy-slider')
    .constant('MAX_SUPPORTED_WIDTH', 2560)
    .constant('MAX_SUPPORTED_HEIGHT', 1440)
    .constant('MIN_SUPPORTED_WIDTH', 1366)
    .constant('MIN_SUPPORTED_HEIGHT', 768);
})();
