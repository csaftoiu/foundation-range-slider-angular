'use strict';

angular.module('foundation-range-slider-angular.demo', [
  'foundation-range-slider-angular',
  'gist'
])

  .config(function ($sceDelegateProvider) {
    // allow loading template urls from gist
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://gist.githubusercontent.com/csaftoiu/**'
    ]);
  })

;

