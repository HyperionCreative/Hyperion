(function () {
  'use strict';

  angular
    .module('state.sub-page-template', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('root.sub-page-template', {
          abstract: true,
          views: {
            'page-content@': {
              controller: ['$document', '$rootScope', function ($document, $rootScope) {
                // Don't forget to change navigation-hamburger.html after you modify the items' order!
                var navigationStates = [
                  'root.sub-page-template.expertise',
                  'root.sub-page-template.our-processes',
                  'root.sub-page-template.portfolio',
                  'root.sub-page-template.contact'
                ];

                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
                  var toStateIndex = navigationStates.indexOf(toState.name);
                  var fromStateIndex = navigationStates.indexOf(fromState.name);

                  if (toStateIndex === -1 || fromStateIndex === -1) {
                    angular.element($document[0].querySelector('.sub-page-template .slide-direction'))
                      .removeClass('left')
                      .addClass('right');
                  } else {
                    var order = toStateIndex - fromStateIndex;

                    if (order > 0) {
                      angular.element($document[0].querySelector('.sub-page-template .slide-direction'))
                        .removeClass('left')
                        .addClass('right');
                    } else {
                      angular.element($document[0].querySelector('.sub-page-template .slide-direction'))
                        .removeClass('right')
                        .addClass('left');
                    }
                  }
                });
              }],
              templateUrl: 'state-components/sub-page-template/sub-page-template.html'
            }
          }
        });
    }]);
})();
