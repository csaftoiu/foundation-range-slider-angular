'use strict';

var j = 0;

angular.module('foundation-range-slider-angular.demo')

  /**
   * @ngdoc directive
   * @name foundation-range-slider-angular.demo:ng-include-gist
   *
   * @restrict E
   *
   * @description Includes the latest source of a {@link https://gist.github.com/ gist}, followed by
   * an embedded gist displaying the source code.
   *
   * @param {string} id The gist id
   * @param {string=} file The gist filename. Defaults to "example.html".
   */
  .directive('ngIncludeGist', function ($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'modules/demo/ng-include-gist.html',
      scope: { id: '@', file: '@' },
      link: function (scope, element, attrs, ngModelCtrl) {
        scope.file = scope.file || 'example.html';
        scope.url = "https://gist.githubusercontent.com/csaftoiu/" + scope.id + "/raw/" + scope.file;
        scope.url += '?bustCache=' + (new Date()).valueOf();
      }
    };
  })

;
