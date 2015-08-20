(function () {
  'use strict';

  // When a user enters on /expertise he will be redirected here.
  var defaultStateName = 'root.sub-page-template.expertise.design';

  angular
    .module('state.expertise', [
      'state.sub-page-template'
    ])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
      // This state acts as a redirect
        .state('root.sub-page-template.expertise', {
          url: '/expertise',
          views: {
            'sub-page-content': {
              // This highlights the current open tab
              controller: ['$scope', function ($scope) {
                $scope.$on('$stateChangeSuccess', function (event, toState) {
                  $scope.activeTab = toState.name;
                });
              }],
              templateUrl: 'state-components/expertise/expertise.html'
            }
          }
        })
        .state('root.sub-page-template.expertise.consulting', {
          url: '/consulting',
          views: {
            'expertise': {
              templateUrl: 'state-components/expertise/consulting.html'
            }
          }
        })
        .state('root.sub-page-template.expertise.design', {
          url: '/design',
          views: {
            'expertise': {
              templateUrl: 'state-components/expertise/design.html'
            }
          }
        })
        .state('root.sub-page-template.expertise.development', {
          url: '/development',
          views: {
            'expertise': {
              templateUrl: 'state-components/expertise/development.html'
            }
          }
        });
    }])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
      $rootScope.$on('$stateChangeStart',
        function (event, toState) {
          if (toState.name === 'root.sub-page-template.expertise') {
            event.preventDefault();

            $state.go(defaultStateName);
          }
        });
    }]);
})();