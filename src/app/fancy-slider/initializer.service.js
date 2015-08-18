(function () {
  'use strict';

  // This is the starting point of the fancy slider.
  // 
  // It makes sure everything is up and running before we start the slider's "boot" process.
  // All of his "init modules" are required to offer an init function which must return a promise.
  // When the promise is resolved, then that module is considered initialized.

  angular
    .module('app.fancy-slider')
    .service('FancySliderInitializer', ['$q', 'FancyAnimations', 'FancyBlur', 'FancyDepthBars', 'FancyResources', function ($q, Animations, Blur, DepthBars, Resources) {
      this.init = init;

      ////////////
      // Public //
      ////////////
      function init(stage, renderer, onComplete) {
        // This way we don't chain promises. Thus the init processes happen simultaneously.
        $q.all([Resources.init(stage), Blur.downloadAssets(), DepthBars.init(stage, renderer)]).then(function () {
          Blur.init(stage, renderer).then(function () {
            Animations.init(stage, renderer, Resources.get()).then(function () {
              onComplete();
            });
          });
        });
      }
    }]);
})();
