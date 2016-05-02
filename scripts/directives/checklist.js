'use strict';

angular.module("IBMcheckList")
  // .directive('glossary', function() {
  //   return {
  //     templateUrl: 'templates/glossary.html',
  //     //controller: 'mainCtrl', //make sure you remove the mainCtrl from the view if using a controller
  //     replace: true //removes the <glossary> tag
  //   }
  // })
  .directive('printheader', function() {
      return {
        templateUrl: 'templates/printheader.html',
        //controller: 'mainCtrl', //make sure you remove the mainCtrl from the view if using a controller
        replace: true //removes the <glossary> tag
      }
  })
  .directive('printfooter', function() {
      return {
        templateUrl: 'templates/printfooter.html',
        //controller: 'mainCtrl', //make sure you remove the mainCtrl from the view if using a controller
        replace: true //removes the <glossary> tag
      }
  });
