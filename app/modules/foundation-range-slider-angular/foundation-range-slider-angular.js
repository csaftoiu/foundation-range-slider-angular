'use strict';

var j = 0;

/**
 * @ngdoc overview
 * @name foundation-range-slider-angular
 * @description
 * # foundation-range-slider-angular
 *
 * The base module for Foundation Range-Slider Angular.
 *
 */

angular.module('foundation-range-slider-angular', [
])

  /**
   * @ngdoc directive
   * @name foundation-range-slider-angular.directive:range-slider
   *
   * @restrict E
   *
   * @description Creates a Foundation {@link http://foundation.zurb.com/docs/components/range_slider.html range slider}
   */
  .directive('rangeSlider', function ($timeout) {
    return {
      restrict: 'E',
      require: '?ngModel',
      templateUrl: 'modules/foundation-range-slider-angular/range-slider.html',
      // scope: {},
      compile: function(cElement, cAttributes, transclude) {
        var thisJ = j++;
        return {
          pre: function(scope, element, attrs, ngModelCrl) {
            scope.vertical = 'vertical' in attrs;
          },
          post: function (scope, element, attrs, ngModelCtrl) {
            // as soon as done with the digest, but before rendering, enable the sliders, and *then* enable
            // ngModelCtrl bindings
            $timeout(function () {
              $(document).foundation();
              initializeModelCtrl();
            });

            var initializeModelCtrl = function () {
              if (!ngModelCtrl) {
                return;
              }

              ngModelCtrl.$formatters.push(function (modelValue) {
                //console.log(thisJ, "format model --> view", modelValue);
                if (modelValue === undefined || modelValue === null) {
                  return modelValue;
                }
                return ''+modelValue;
              });

              ngModelCtrl.$parsers.push(function (viewValue) {
                //console.log(thisJ, "parse view --> model", viewValue);
                if (viewValue === null) {
                  return null;
                }
                return parseFloat(viewValue);
              });

              // the element with the data-slider on it is the first child, i.e. the first div
              var sliderElement = angular.element(element.children()[0]);

              // update slider when view value changes
              ngModelCtrl.$render = function () {
                //console.log(thisJ, "render", ngModelCtrl.$viewValue);
                if (ngModelCtrl.$viewValue === undefined || ngModelCtrl.$viewValue === null) {
                  // leave it where it was. happens if e.g. an <input type="number"> is empty
                  return;
                }

                sliderElement.foundation('slider', 'set_value', ngModelCtrl.$viewValue);
              };

              // trigger first render from iniital model value
              ngModelCtrl.$render();

              // on change, set new view value
              // work around https://github.com/zurb/foundation/issues/6606 by not setting view value if
              // nothing changed. fixes bug if have multiple sliders on the same model value
              var lastKnownValue = null;
              sliderElement.on('change.fndtn.slider', function (event) {
                var newValue = sliderElement.attr('data-slider');
                if (newValue === lastKnownValue) {
                  return;
                }
                //console.log(thisJ, "changed to", newValue, "from", lastKnownValue);

                lastKnownValue = newValue;
                ngModelCtrl.$setViewValue(newValue);
              });


              // trigger $render when slider is shown
              if (typeof MutationObserver !== "undefined") {
                var observer = new MutationObserver(function () {
                  scope.$apply(function () {
                    ngModelCtrl.$render();
                  });
                });
                // detect adding ng-show/ng-hide to some element somewhere
                observer.observe(document, {attributes: true, subtree: true, attributeFilter: ['class']});
              }
            };
          }
        };
      }
    };
  })

;
