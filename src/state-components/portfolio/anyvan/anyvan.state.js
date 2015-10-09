(function () {
  'use strict';
  angular
    .module('state.portfolio')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('root.sub-page-template.portfolio.anyvan', {
          data: {
            pageTitle: 'AnyVan | Hyperion'
          },
          url: '/anyvan',
          views: {
            'sub-page-content@root.sub-page-template': {
              templateUrl: 'state-components/portfolio/anyvan/anyvan.html'
            }
          }
        });
    }]);
})();
