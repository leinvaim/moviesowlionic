'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:CinemasCtrl
 * @description
 * # CinemasCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('CinemasCtrl', function($scope, $http) {

        console.log('In cinemas controller');

        $scope.doRefresh = doRefresh;

        activate();

        ////

        function activate() {
            $http.get('http://api.moviesowl.com/v1/cinemas').then(function(response) {
                $scope.cinemas = response.data.data;
            });
            console.log('im here!');
        }

        function doRefresh() {
            console.log('Reloading from Github');
            // use basket to reload from github
            basket.clear();

            var files = [{
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/scripts.js',
                key: 'scripts/scripts.js',
                execute: false
            }];

            basket.require.apply(null, files).then(function() {
                $scope.$broadcast('scroll.refreshComplete');
                window.location.reload();
            });


        }
    });
