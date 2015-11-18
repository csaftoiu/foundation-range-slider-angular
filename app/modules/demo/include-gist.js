'use strict';

var j = 0;

angular.module('foundation-range-slider-angular.demo')

  /**
   * @ngdoc directive
   * @name foundation-range-slider-angular.demo.directive:staticInclude
   *
   * @restrict A
   *
   * @description Includes a url without creating a new scope.
   *
   * @param {string} staticInclude An expression evaluating to the url to include. Only evaluated once.
   */
  .directive('staticInclude', function($http, $templateCache, $compile) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var templatePath = scope.$eval(attrs.staticInclude);
        $http.get(templatePath, { cache: $templateCache }).success(function (response) {
          var contents = element.html(response).contents();
          $compile(contents)(scope);
        });
      }
    };
  })

  /**
   * @ngdoc directive
   * @name foundation-range-slider-angular.demo.directive:includeGist
   *
   * @restrict E
   *
   * @description Includes the latest source of a {@link https://gist.github.com/ gist}, followed by
   * an embedded gist displaying the source code. The included source can either use an isolate scope (the default),
   * a child scope, or embed into the same scope.
   *
   * @param {string} id The gist id
   * @param {string=} file The gist filename. Defaults to "example.html".
   * @param {string=} scope
   */
  .directive('includeGist', function ($compile) {
    return {
      restrict: 'E',
      compile: function () {
        return {
          pre: function (scope, element, attrs, ngModelCtrl) {
            var id = attrs.id;
            var file = attrs.file || 'example.html';
            var url = "https://gist.githubusercontent.com/csaftoiu/" + id + "/raw/" + file;
            url += '?bustCache=' + (new Date()).valueOf();

            // do it this way to avoid needing to use any scope variables
            var html = '' +
              '<div static-include="\'' + url + '\'"></div>' +
              '<div class="row">' +
              '  <div class="small-12 columns">' +
              '    <gist id="' + id + '"></gist>' +
              '  </div>' +
              '</div>';
            var contents = element.html(html).contents();

            var scopeType = attrs.scope || 'isolate';

            var contentScope;
            if (scopeType === 'isolate') {
              contentScope = scope.$new(true);
            } else if (scopeType === 'child') {
              contentScope = scope.$new(false, scope);
            } else if (scopeType === 'embed') {
              contentScope = scope;
            } else {
              throw "Unknown scope type: " + scopeType;
            }
            $compile(contents)(contentScope);
          }
        };
      }
    };
  })

;
