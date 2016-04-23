(function () {
  'use strict';
  angular
    .module('state.portfolio')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('root.sub-page-template.portfolio.grow', {
          data: {
            simpleSeoTitle: 'Grow with a CFO - Hyperion',
            simpleSeoDescription: 'Learn more about the website we developed for Grow with a CFO.',
            simpleSeoKeywords: 'hyperion, grow with a cfo, grow, financial, financial consulting, services, website, site, web design, responsive, code, html, css'
          },
          url: '/grow',
          views: {
            'sub-page-content@root.sub-page-template': {
              templateUrl: 'state-components/portfolio/grow/grow.html'
            }
          }
        });
    }]);
})();
