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
        $scope.update = update;
        $scope.reset = reset;

        activate();

        ////

        function activate() {
            $http.get('http://api.moviesowl.com/v1/cinemas').then(function(response) {
                $scope.cinemas = response.data.data;
            });
            console.log('im here!');
            $scope.$broadcast('scroll.refreshComplete');
        }

        function reload() {
            console.log('Reloading in 2 seconds');
            setTimeout(function() {
                window.location.reload();
            }, 1000);
        }

        function reset() {
            console.log('Resetting');
            basket.clear();
            reload();
        }

        function update() {
            console.log('Reloading from Github');
            // use basket to reload from github
            basket.clear();

            var files = [{
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/scripts.js',
                key: 'scripts/scripts.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/templates.js',
                key: 'scripts/templates.js',
                execute: false
            }];

            basket.require.apply(null, files).then(function(stuff) {
                console.log('New files cached, about to reload');
                console.log('Templates:');
                console.log(basket.get('scripts/templates.js'));
                console.log('RELOAD FILES:');
                console.log(stuff);
                
                $scope.$broadcast('scroll.refreshComplete');
                reload();
            }, function() {
                console.log('Failed to get from Github!');
            });
        }

        function doRefresh() {
            activate();
        }
    });
