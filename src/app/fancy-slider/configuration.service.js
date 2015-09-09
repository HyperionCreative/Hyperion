(function () {
  'use strict';

  // This configuration animation is OKish.

  angular
    .module('app.fancy-slider')
    .service('FancyConfiguration', ['TweenEasings', function (TweenEasings) {
      // Animations
      this.ANIMATION_DURATION = 1300;
      this.ANIMATION_EASING = TweenEasings.Power3.easeInOut;
      this.ANIMATION_THROW_IN_EASING = TweenEasings.Power3.easeInOut;

      // Blur Animations
      this.BLUR_ANIMATION_DURATION = 300;
      this.BLUR_ANIMATION_EASING = TweenEasings.Linear;

      // Resolutions interval
      this.MAX_WIDTH = 2560;
      this.MAX_HEIGHT = 1440;
      this.MIN_WIDTH = 1366;
      this.MIN_HEIGHT = 768;

      // Needed by depth bars to stick to the edge of the screen!
      this.GLOBAL_MIN_WIDTH = 1024;

      // Native resolutions
      this.NATIVE_WIDTH = 2560;
      this.NATIVE_HEIGHT = 1440;
    }]);
})();
