// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-06-08 using
// generator-karma 0.8.3

module.exports = function (config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'kt.directivesTemplates'
    },

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-elastic/elastic.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/json3/lib/json3.js',
      'bower_components/pixi/bin/pixi.js',
      'bower_components/raf.js/raf.js',
      'bower_components/smoothscroll/dist/smoothscroll.js',
      'bower_components/ua-parser-js/src/ua-parser.js',
      'bower_components/gsap/src/uncompressed/TweenMax.js',
      // endbower
      'bower_components/angular-mocks/angular-mocks.js',

      'src/app/app.module.js',

      'src/common/**/*.module.js',
      'src/common/**/*.js',

      // 'src/app/**/*.module.js',
      // 'src/app/**/*.js',
      //
      // 'src/state-components/**/*.module.js',
      // 'src/state-components/**/*.js',

      // All the directives' templates.
      // todo rename the templates to <name>.tpl.html ?
      // 'src/app/**/*.html',
      // 'src/common/**/*.html',
      // 'src/state-components/**/*.html',

      'src/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS',

      'Chrome',
      'Firefox',
      'IE'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',

      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-ie-launcher',

      'karma-jasmine',

      'karma-ng-html2js-preprocessor'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
