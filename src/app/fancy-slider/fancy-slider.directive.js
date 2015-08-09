(function () {
  'use strict';

  angular
    .module('app.fancy-slider')
    .directive('hypFancySlider', ['PIXI', 'TweenLite', 'FancyAnimations', 'FancyConfiguration', 'FancyDepthBars', 'FancyResources', function (PIXI, TweenLite, Animations, Configuration, DepthBars, Resources) {
      return {
        link: function (scope, iElement) {
          ///////////////
          // Variables //
          ///////////////
          var
            stage = new PIXI.Container(),
            renderer = new PIXI.autoDetectRenderer(Configuration.NATIVE_WIDTH, Configuration.NATIVE_HEIGHT, {
              antialised: false,
              transparent: true
            });

          var
            animations = Animations.get(),
            depthBars = DepthBars.get(),
            slidesAndResources = Resources.get();

          ///////////////
          // Run block //
          ///////////////

          // Appends the canvas, thus initializing pixi.
          angular.element(iElement[0].querySelector('.stage-container')).append(renderer.view);

          // Adds the resources to the stage.
          angular.forEach(slidesAndResources, function (resources) {
            angular.forEach(resources, function (resource) {
              stage.addChild(resource.sprite);
            });
          });

          // Adds the depth bars to the stage.
          angular.forEach(depthBars, function (depthBar) {
            stage.addChild(depthBar);
          });

          // Applies zIndex
          stage.children.sort(function (a, b) {
            a.zIndex = a.zIndex || 0;
            b.zIndex = b.zIndex || 0;
            return a.zIndex - b.zIndex;
          });

          // Hides everything from sight - moves everything to the left.
          animations.firstSlide.toLeft(undefined, true);
          animations.secondSlide.toLeft(undefined, true);
          animations.thirdSlide.toLeft(undefined, true);

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

          // The animations
          var
            canAnimate = true,
            currentSlide = 0,
            slides = ['firstSlide', 'secondSlide', 'thirdSlide'];

          canAnimate = false;
          animations.firstSlide.toBottom(undefined, true);
          animations.firstSlide.toCenter(function () {
            canAnimate = true;
          });

          iElement.bind('click', function () {
            if (canAnimate) {
              canAnimate = false;

              animations[slides[currentSlide]].toLeft();

              currentSlide = (currentSlide + 1) % 3;

              animations[slides[currentSlide]].toRight(undefined, true);
              animations[slides[currentSlide]].toCenter(function(){
                canAnimate = true;
              });
            }
          });

          // Helpful logs
          console.log('stage', stage);
          console.log('depthBars', depthBars);
          console.log('animations', animations);
        },
        replace: true,
        restrict: 'E',
        templateUrl: 'app/fancy-slider/fancy-slider.html'
      };
    }]);
})();
