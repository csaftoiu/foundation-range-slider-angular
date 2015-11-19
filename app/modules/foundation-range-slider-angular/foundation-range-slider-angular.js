'use strict';

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
   * @description Creates a Foundation {@link http://foundation.zurb.com/docs/components/range_slider.html range slider}.
   *
   * @param {string=} ngModel Assignable angular expression to data-bind to.
   * @param {boolean=} vertical If present, creates a vertical slider instead of a horizontal one.
   * @param {number=} min Angular expression evaluating to the minimum slider value. Only evaluated once, when the
   * slider is created.
   *
   * <i>(default: 0)</i>
   * @param {number=} max Angular expression evaluating to the maximum slider value. Only evaluated once, when the
   * slider is created.
   *
   * <i>(default: 100)</i>
   * @param {number=} step Angular expression evaluating to the slider step value. Only evaluated once, when the
   * slider is created.
   *
   * <i>(default: 1)</i>
   * @param {number=} precision Angular expression evaluating to the precision, i.e. the number of decimal points to use.
   * Only evaluated once, when the slider is created.
   *
   * <i>(default: 2)</i>
   *
   * @example See the {@link http://csaftoiu.github.io/foundation-range-slider-angular/ demo page}.
   *
   */
  .directive('rangeSlider', function ($timeout, $compile) {
    return {
      restrict: 'E',
      require: '?ngModel',
      templateUrl: 'modules/foundation-range-slider-angular/range-slider.html',
      scope: { min: '=', max: '=', step: '=', precision: '=' },
      compile: function(cElement, cAttributes, transclude) {
        return {
          pre: function(scope, element, attrs, ngModelCrl) {
          },
          post: function (scope, element, attrs, ngModelCtrl) {
            scope.vertical = 'vertical' in attrs; // for the class

            // the element with the data-slider on it is the first child, i.e. the first div
            var sliderElement = angular.element(element.children()[0]);

            // reflow enable the slider after the digest is done
            $timeout(function () {
              var options = '';
              options += 'vertical: ' + (scope.vertical) + '; ';
              options += 'start: ' + (''+(scope.min || 0)) + '; ';
              options += 'end: ' + (''+(scope.max || 100)) + '; ';
              options += 'precision: ' + (''+(scope.precision || 2)) + '; ';
              options += 'step: ' + (''+(scope.step || 1)) + '; ';
              sliderElement.attr('data-options', options);
              $(document).foundation();
              initializeModelCtrl();
            });

            var initializeModelCtrl = function () {
              if (!ngModelCtrl) {
                return;
              }

              ngModelCtrl.$formatters.push(function (modelValue) {
                if (modelValue === undefined || modelValue === null) {
                  return modelValue;
                }
                return ''+modelValue;
              });

              ngModelCtrl.$parsers.push(function (viewValue) {
                if (viewValue === null) {
                  return null;
                }
                return parseFloat(viewValue);
              });

              // update slider when view value changes
              ngModelCtrl.$render = function () {
                if (ngModelCtrl.$viewValue === undefined || ngModelCtrl.$viewValue === null) {
                  // leave it where it was. happens if e.g. an <input type="number"> is empty
                  return;
                }

                sliderElement.foundation('slider', 'set_value', ngModelCtrl.$viewValue);
              };

              // initialize to half-slider
              if (ngModelCtrl.$viewValue === undefined) {
                ngModelCtrl.$setViewValue(((scope.max - scope.min) / 2 + scope.min).toFixed(scope.precision || 2));
              }
              // trigger first render from initial model value
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

                lastKnownValue = newValue;
                ngModelCtrl.$setViewValue(newValue);
              });

              // re-flow sliders whenever a slider may have appeared after being hidden
              // only trigger once per document, and do the entire document
              if (typeof MutationObserver !== "undefined" && $(document).attr('frsa-observed') === undefined) {
                var observer = new MutationObserver(function () {
                  scope.$apply(function () {
                    $(document).foundation('slider', 'reflow');
                  });
                });

                // detect ng-show/ng-hide changes via class attribute
                observer.observe(document, {attributes: true, subtree: true, attributeFilter: ['class']});
                $(document).attr('frsa-observed', '');
              }
            };
          }
        };
      }
    };
  })

;
