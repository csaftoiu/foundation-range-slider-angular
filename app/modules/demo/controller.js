'use strict';

angular.module('foundation-range-slider-angular.demo')

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
