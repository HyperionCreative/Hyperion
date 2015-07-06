(function () {
  'use strict';

  angular
    .module('common.preloader')
    .provider('Preloader', ['FILES_TO_PRELOAD', function (FILES_TO_PRELOAD) {
      var
        defaults = {
          parallelDownloads: 4
        },
        queues = {};

      this.defaults = defaults;
      this.addToQueue = addToQueue;

      ////////////
      // Public //
      ////////////

      function addToQueue(queueName, path, priority) {
        // Defaults to 0 if the priority is not a number
        priority = angular.isNumber(priority) && isFinite(priority) ? priority : 0;

        // Create the new queue if it doesn't exist
        if (angular.isUndefined(queues[queueName])) {
          queues[queueName] = {
            files: {},

            sizeDownloaded: 0,
            sizeToDownload: 0
          };
        }

        // Create the new priority list if it doesn't exist
        if (angular.isUndefined(queues[queueName].files[priority])) {
          queues[queueName].files[priority] = [];
        }

        queues[queueName].sizeToDownload += FILES_TO_PRELOAD[path];
        queues[queueName].files[priority].push(path);
      }

      /////////////
      // Private //
      /////////////

      // Transforms a queue into a download queue.
      // The download queue it's just an array with all the paths in the correct download order.
      function QueueDecomposer(elements) {
        // Gets all the priorities. They need to be converted to int as they're strings.
        var priorities = Object.keys(elements);
        for (var x = 0; x < priorities.length; x++) {
          priorities[x] = parseInt(priorities[x]);
        }

        // Sorts in descending order
        priorities.sort(function (a, b) {
          return b - a;
        });

        // Goes through each priority and composes the download queue
        var downloadQueue = [];
        for (var i = 0; i < priorities.length; i++) {
          for (var j = 0; j < elements[priorities[i]].length; j++) {
            downloadQueue.push(elements[priorities[i]][j]);
          }
        }

        return downloadQueue;
      }

      //////////
      // $get //
      //////////

      this.$get = ['$rootScope', function ($rootScope) {
        return {
          getProgress: getProgress,
          start: start
        };

        function getProgress(queueName) {
          if (queues[queueName].sizeToDownload > 0) {
            return queues[queueName].sizeDownloaded / queues[queueName].sizeToDownload * 100;
          }

          return 0;
        }

        function start(queueName) {
          var
            queue = queues[queueName],
            PathsArray = new QueueDecomposer(queue.files);

          var next = function () {
            (function (path) {
              if (angular.isDefined(path)) {
                var image = new Image();

                image.onload = function () {
                  // Needed as we're outside of angular's scope
                  $rootScope.$evalAsync(function () {
                    queue.sizeDownloaded += FILES_TO_PRELOAD[path];
                  });

                  next();
                };

                // Atm we treat the onError fn the same as the onLoad.
                // todo should we change this?
                image.onerror = function () {
                  // Needed as we're outside of angular's scope
                  $rootScope.$evalAsync(function () {
                    queue.sizeDownloaded += FILES_TO_PRELOAD[path];
                  });

                  next();
                };

                image.src = path;
              }
            })(PathsArray.shift());
          };

          for (var i = 0; i < defaults.parallelDownloads; i++) {
            next();
          }
        }
      }];
    }]);
})();
