'use strict';

angular.module("IBMcheckList")
  .factory('dataService', ['$http', function ($http) {
    //modeled afterhttp://blog.brunoscopelliti.com/angularjs-promise-or-dealing-with-asynchronous-requests-in-angularjs/
    return {
      getData: function() {
        var promise = $http({method: 'GET', url: 'scripts/mock/checklistData.json'})
        .success(function (data, status, headers, config) {
            return data;
        })
        .error(function (data, status, headers, config) {
            return {"status": false};
        });
        return promise;
      },
      postResults: function (d) {
        //console.log(d);
        //console.log(d[0].pages);

        var mustHaves = [], niceToHaves = [], notSure = [];

        for( var i = 0; i < d[0].pages.length; i++) {

          mustHaves[i] = {
            title: d[0].pages[i].title,
            musthave: []
          };
          niceToHaves[i] = {
            title: d[0].pages[i].title,
            nicetohave: []
          };
          notSure[i] = {
            title: d[0].pages[i].title,
            notsure: []
          };
            for (var j = 0; j < d[0].pages[i].content.length; j++) {
              if (d[0].pages[i].content[j].data[0].musthave === true) {
                mustHaves[i].musthave.push({
                  title: d[0].pages[i].content[j].title
                });

              } else if (d[0].pages[i].content[j].data[0].nicetohave === true) {
                niceToHaves[i].nicetohave.push({
                  title: d[0].pages[i].content[j].title
                });
              } else if (d[0].pages[i].content[j].data[0].notsure === true) {
                notSure[i].notsure.push({
                  title: d[0].pages[i].content[j].title
                });
              }
            }
        }
        var mustHavePage = "", niceToHavePage = "", notSurePage = "";
        //Get length of each  object category and sort by page of largest array
        //console.log(mustHaves);
        //Concatenate h4 title of page as well as titles of each cateogry
        mustHavePage = '<div class="col-xs-12 col-md-6 col-lg-3">';
        for (var k = 0; k < mustHaves.length; k++) {
          //sort arrays by size
          mustHaves.sort(function (a, b) {
              return b.musthave.length - a.musthave.length;
          });
          //if checkboxes exist for each, get the titles
          if (mustHaves[k].musthave.length > 0) {
            mustHavePage += '<h4>' + mustHaves[k].title + ':' + '</h4>';
            for (var l = 0; l < mustHaves[k].musthave.length; l++) {
              mustHavePage += '<p>' + mustHaves[k].musthave[l].title + '</p>';
            }
            if (k % 2 == 0) {
              mustHavePage += '</div><div class="col-xs-12 col-md-6 col-lg-3">';
            }
          }
        }
        mustHavePage += '</div>';
        //print out on page
        document.querySelector('#results-musthave').innerHTML = "";
        document.querySelector('#results-musthave').innerHTML = mustHavePage;

        niceToHavePage = '<div class="col-xs-12 col-md-6 col-lg-3">';
        for (var k = 0; k < niceToHaves.length; k++) {
          niceToHaves.sort(function (a, b) {
              return b.nicetohave.length - a.nicetohave.length;
          });
          if (niceToHaves[k].nicetohave.length > 0) {
            niceToHavePage += '<h4>' + niceToHaves[k].title + ':' + '</h4>';
            for (var l = 0; l < niceToHaves[k].nicetohave.length; l++) {
              niceToHavePage += '<p>' + niceToHaves[k].nicetohave[l].title + '</p>';
            }
            if (k % 2 == 0) {
              niceToHavePage += '</div><div class="col-xs-12 col-md-6 col-lg-3">';
            }
          }
        }
        niceToHavePage += '</div>';
        //print out on page
        document.querySelector('#results-nicetohave').innerHTML = "";
        document.querySelector('#results-nicetohave').innerHTML = niceToHavePage;

        notSurePage = '<div class="col-xs-12 col-md-6 col-lg-3">';
        for (var k = 0; k < notSure.length; k++) {
          //sort array by highest number of selected values
          notSure.sort(function (a, b) {
              return b.notsure.length - a.notsure.length;
          });
          if (notSure[k].notsure.length > 0) {
            notSurePage += '<h4>' + notSure[k].title + ':' + '</h4>';
            for (var l = 0; l < notSure[k].notsure.length; l++) {
              notSurePage += '<p>' + notSure[k].notsure[l].title + '</p>';
            }
            if (k % 2 == 0) {
              notSurePage += '</div><div class="col-xs-12 col-md-6 col-lg-3">';
            }
          }
        }
        notSurePage += '</div>';
        //print out on page
        document.querySelector('#results-notsure').innerHTML = "";
        document.querySelector('#results-notsure').innerHTML = notSurePage;

      } //End postResults()
    } //End return
 }]);
