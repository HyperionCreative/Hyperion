(function () {
  'use strict';

  angular
    .module('app.fancy-slider', [
      'app.fancy-slider.animations',
      'app.fancy-slider.blur',
      'app.fancy-slider.depth-bars',
      'app.fancy-slider.resizer',
      'app.fancy-slider.resources',
      'app.fancy-slider.slide-description',
      'common.device-pixel-ratio',
      'common.pixi',
      'common.viewport-size'
    ]);
})();
