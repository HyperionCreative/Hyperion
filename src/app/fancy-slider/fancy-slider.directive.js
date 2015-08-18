(function () {
  'use strict';

  angular
    .module('app.fancy-slider')
    .directive('hypFancySlider', ['$rootScope', '$state', '$window', 'PIXI', 'FancyAnimations', 'FancyBlur', 'FancyConfiguration', 'FancySliderInitializer', function ($rootScope, $state, $window, PIXI, Animations, Blur, Configuration, SliderInitializer) {
      return {
        link: function (scope, iElement) {
          ///////////////
          // Variables //
          ///////////////
          var
            stage = new PIXI.Container(),
            // Changing this, from autoDetectRenderer to CanvasRenderer, increases the loading time. 
            // I'm not sure what's the performance impact. todo check this!
            renderer = new PIXI.autoDetectRenderer(Configuration.NATIVE_WIDTH, Configuration.NATIVE_HEIGHT, {
              antialised: false,
              transparent: true
            });

          var
            FIRST_SLIDE = 0,
            SLIDES_COUNT = 3,
            // It starts from the beginning
            currentSlide = FIRST_SLIDE;

          ///////////////////
          // Configuration //
          ///////////////////
          // Pixi constantly triggers RAF. We disable it as RAF will be triggered by TweenLite's ticker!
          // 
          // todo in case of performance issues, this may be one of the culprits. I've read through
          // PIXI source code that some extra RAFs are needed in order to stabilize things.
          PIXI.ticker.shared.stop();

          ///////////////
          // Run block //
          ///////////////

          // Needed by slider description in order to change the client's opacity
          iElement.attr('data-active-slide', currentSlide + 1);

          // Appends the canvas, thus initializing pixi.
          angular.element(iElement[0].querySelector('.stage-container')).append(renderer.view);

          // Everything is ready!
          SliderInitializer.init(stage, renderer, function () {
            // Variables
            var
              animationsControllers = Animations.getControllers(),
              blurControllers = Blur.getControllers();

            // Functions
            function changeCurrentSlideVar(modifier) {
              currentSlide += modifier;

              if (currentSlide >= SLIDES_COUNT) {
                // Start from the beginning
                currentSlide = 0;
              } else if (currentSlide < 0) {
                // Start from the end
                currentSlide = SLIDES_COUNT - 1;
              }

              // Needed by slider description in order to change the client's opacity
              iElement.attr('data-active-slide', currentSlide + 1);
            }

            function toLeft() {
              if (!Blur.isBlurring() && !Blur.isBlurred() && animationsControllers.toLeft(currentSlide)) {
                changeCurrentSlideVar(-1);
              }
            }

            function toRight() {
              if (!Blur.isBlurring() && !Blur.isBlurred() && animationsControllers.toRight(currentSlide)) {
                changeCurrentSlideVar(1);
              }
            }

            // Run block
            // Applies zIndex
            stage.children.sort(function (a, b) {
              a.zIndex = a.zIndex || 0;
              b.zIndex = b.zIndex || 0;
              return a.zIndex - b.zIndex;
            });

            // Renders the newly sorted resources
            renderer.render(stage);

            // The slider is ready, hooray!
            $rootScope.$emit('fancy-slider.ready');

            // State handling
            (function () {
              animationsControllers.throwIn(function () {
                  scope.$evalAsync(function () {
                    scope.changeSlidesToRight = toRight;
                  });

                  // todo Shouldn't we debounce this?
                  angular.element($window).on('keydown', function (event) {
                    if (event.keyCode === 39) {
                      toRight();
                    } else if (event.keyCode === 37) {
                      toLeft();
                    }
                  });
                },
                // If we're not on the first page, don't show the animation!
                $state.current.name !== 'root.index');

              if ($state.current.name !== 'root.index') {
                blurControllers.fastBlurStage(currentSlide);
              }

              $rootScope.$on('$stateChangeStart',
                function (event, toState) {
                  if (Blur.isBlurring() || Animations.isAnimating()) {
                    event.preventDefault();
                  } else {
                    if (toState.name === 'root.index') {
                      blurControllers.unblurStage(currentSlide);
                    } else {
                      blurControllers.blurStage(currentSlide);
                    }
                  }
                });
            })();
          });
        },
        replace: true,
        restrict: 'E',
        templateUrl: 'app/fancy-slider/fancy-slider.html'
      };
    }]);
})();
