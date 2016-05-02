'use strict';

//TODO: modify for window resize, similar to http://stackoverflow.com/questions/14703517/angular-js-set-element-height-on-page-load
angular.module("IBMcheckList")
  .controller('mainCtrl', function($scope, $window, dataService) {
    $scope.IBMchecklistData = [];
    //Get data by $http request, pass to empty array above
    dataService.getData().then(function(promise) {
      $scope.IBMchecklistData = promise.data;
      //console.log($scope.IBMchecklistData);
    });
    //watch checklist changes as user checks boxes and post the data to postResults()
    $scope.$watch('IBMchecklistData', function () {
      dataService.postResults($scope.IBMchecklistData);
    }, true);

    $scope.showHeaderCategory = function() {
      $('header h4 span.hidden-category').fadeTo( "slow" , 1);
    };
    //Background image fade
    $scope.fadeBackground = function() {
      angular.element(document.querySelector('.background-image')).addClass('fade-background');
    };
    $scope.activeResult = function(event) {
      var target = angular.element(event.currentTarget);
      var theGrandParentRow = target.parent().parent();
      var theParentRow = target.parent();
      target.children().toggleClass('active');
      theParentRow.children('div.results').toggleClass('open');
      theGrandParentRow.children('div.results').toggleClass('open');
    };
  })
  .controller('tableCtrl', function($scope) {
    //$scope.$timeout = $timeout;
    //arrow button rotation
    $scope.activeButton = function(event) {
      var target = angular.element(event.currentTarget);
      var theParentRow = target.parent().parent().parent();
      target.children().toggleClass('active');
      theParentRow.toggleClass('show');
      theParentRow.children('div.explanatory-text').toggleClass('show');
    };
    $scope.revealContent = function() {
      $('.section-results, .results, .footer-cta .cta, .footer-cta .print-button, .footer').fadeIn();
    };

  })
  .controller('glossaryModalCtrl', function ($scope, $uibModal, $log) {
    //open modal
    $scope.open = function (size) {
      $scope.$modalInstance = $uibModal.open({
        scope: $scope,
        templateUrl: "templates/glossary.html",
        size: size
      });
    };
    //close modal
    $scope.close = function() {
      $scope.$modalInstance.close();
    };

});
