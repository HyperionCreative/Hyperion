(function () {
  'use strict';

  angular
    .module('app.fancy-slider.resizer')
    .directive('hypFancyResizer', ['TweenLite', 'FancyConfiguration', 'FancyResizer', function (TweenLite, Configuration, ResizerService) {
      return {
        link: function (scope, iElement) {
          // Sets the original size
          iElement.css({
            height: Configuration.NATIVE_HEIGHT + 'px',
            width: Configuration.NATIVE_WIDTH + 'px',
          });

          ResizerService.onProportionChange(function (proportion) {
            iElement.css({
              'margin-left': -(Configuration.NATIVE_WIDTH * proportion / 2) + 'px',
            });

            // This is needed in order not to break the other transform properties.
            TweenLite.to(iElement[0], 0, {
              scale: proportion
            });
          });
        },
        restrict: 'A'
      };
    }]);
})();
