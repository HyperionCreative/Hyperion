(function () {
  'use strict';

  angular
    .module('state.state-components')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('root', {
          abstract: true,
          views: {
            'preloader': {
              controller: 'PreloaderCtrl',
              templateUrl: 'state-components/preloader/preloader.html'
            },
            'fancy-slider': {
              template: '<hyp-fancy-slider></hyp-fancy-slider>'
            }
          }
        });

      $urlRouterProvider.otherwise('/');
    }]);
})();
