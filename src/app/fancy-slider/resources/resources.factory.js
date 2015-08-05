(function () {
  'use strict';

  angular
    .module('app.fancy-slider.resources')
    .factory('FancyResource', ['PIXI', function (PIXI) {
      //////////////
      // Resource //
      //////////////
      function Resource(url) {
        var texture = PIXI.Texture.fromImage(url);

        this.positions = {};
        this.sprite = (function () {
          var sprite = new PIXI.Sprite(texture);

          // Transform origin: 50% 50%
          sprite.anchor.x = 0.5;
          sprite.anchor.y = 0.5;

          return sprite;
        })();
        this.texture = texture;
      }

      ///////////////
      // Prototype //
      ///////////////
      (function () {
        function convertCoordinate(coordinate, size) {
          if (coordinate >= 0) {
            return coordinate + size / 2;
          } else {
            return coordinate - size / 2;
          }
        }

        function convertRotation(rotation) {
          if (rotation === 0) {
            return 0;
          }

          return PIXI.PI_2 / (360 / rotation);
        }

        Resource.prototype.addPosition = function (name, x, y, rotation) {
          // Converts the coordinates since it has altered the sprite's anchors.
          x = convertCoordinate(x, this.texture.width);
          y = convertCoordinate(y, this.texture.height);
          rotation = convertRotation(rotation);

          this.positions[name] = {
            x: x,
            y: y,
            rotation: rotation
          };
        };
      })();

      //////////////
      // Exporter //
      //////////////
      return Resource;
    }]);
})();
