'use strict';

var module = angular.module('foundation-range-slider-angular.demo')

  /**
   * @ngdoc function
   * @name foundation-range-slider-angular.demo.controller:DemoCtrl
   * @description
   * # DemoCtrl
   * Controller of the slider demo.
   */

  .controller('DemoCtrl', function () {})

  .controller('ShowHideCtrl', function ($scope) {
    $scope.showHide = 15;
    $scope.$watch('showHide', function (val) {
      if (val === undefined || val === null) {
        return;
      }
      $scope.showHideOpposite = 100 - val;
    });
    $scope.$watch('showHideOpposite', function (val) {
      if (val === undefined || val === null) {
        return;
      }
      $scope.showHide = 100 - val;
    });
  })

;
