(function () {
  'use strict';

  angular
    .module('HyperionApp', [
      //////////////////////////////
      // Official angular modules //
      //////////////////////////////

      'ngAnimate',
      'ngSanitize',
      // 'ngTouch',

      ///////////////////////
      // Third party modules //
      ///////////////////////

      'monospaced.elastic',
      'ui.router',

      ////////////////////
      // Common modules //
      ////////////////////

      'common.carousel-slider',
      'common.google-analytics',
      'common.simple-hoverable',
      'common.simple-page-title',
      'common.ua-parser',

      //////////////////////
      // Specific Modules //
      //////////////////////

      'app.center-me',
      'app.custom-cursors',
      'app.fancy-slider',
      'app.http-error-handler',
      'app.navigation-hamburger',
      'app.navigation-tracker',
      'app.on-horizontal-scroll',
      'app.portfolio-header',
      'app.simple-footer',
      'app.simple-header',
      'app.strings',
      'app.view-animations',

      //////////////////////
      // State Components //
      //////////////////////

      'state.state-components'
    ]);
})();
