(function () {
  'use strict';

  angular
    .module('app.fancy-slider')
    .directive('hypFancySlider', ['PIXI', 'FancyAnimations', 'FancyResources', 'TweenLite', function (PIXI, FancyAnimations, FancyResources, TweenLite) {
      return {
        link: function (scope, iElement) {
          ///////////////////
          // Configuration //
          ///////////////////
          var
            FANCY_SLIDER_WIDTH = 2560,
            FANCY_SLIDER_HEIGHT = 1440;

          ///////////////
          // Variables //
          ///////////////
          var
            stage = new PIXI.Container(),
            renderer = new PIXI.autoDetectRenderer(FANCY_SLIDER_WIDTH, FANCY_SLIDER_HEIGHT, {
              antialised: false,
              transparent: true
            });

          var
            animations = FancyAnimations.get(),
            slidesAndResources = FancyResources.get();

          ///////////////
          // Run block //
          ///////////////

          // Appends the canvas, thus initializing pixi.
          iElement.append(renderer.view);

          // Adds the resources to the stage.
          angular.forEach(slidesAndResources, function (resources) {
            angular.forEach(resources, function (resource) {
              stage.addChild(resource.sprite);
            });
          });

          // Pixi constantly triggers RAF. We disable it as RAF will be triggered by TweenLite's ticker!
          // 
          // todo in case of performance issues, this may be one of the culprits. I've read through
          // PIXI source code that some extra RAFs are needed in order to stabilize things.
          PIXI.ticker.shared.stop();

          // This is how the scene will get rendered! 
          // Each time TweenLite triggers a tick, we draw the scene.
          TweenLite.ticker.addEventListener('tick', function () {
            renderer.render(stage);
          });

          // Only start the ticker when needed otherwise RAF will be triggered endlessly.
          // I suspect this is a bug on GSAP side.
          // 
          // todo in case of performance issues, this may be one of the culprits.
          TweenLite.ticker.sleep();

          console.log(animations);
        },
        replace: true,
        restrict: 'E',
        templateUrl: 'app/fancy-slider/fancy-slider.html'
      };
    }]);
})();
