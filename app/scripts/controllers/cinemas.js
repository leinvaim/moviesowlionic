'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:CinemasCtrl
 * @description
 * # CinemasCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('CinemasCtrl', function($scope, $http, $ionicLoading) {

        console.log('In cinemas controller');

        // $scope.doRefresh = doRefresh;
        $scope.update = update;
        $scope.reset = reset;

        // activate();

        // ////

        // function activate() {
        //     $http.get('http://api.moviesowl.com/v1/cinemas', {cache: true}).then(function(response) {
        //         console.log('hehe');
        //         $scope.cinemas = response.data.data;
        //     });
        //     console.log('im here!');
        //     $scope.$broadcast('scroll.refreshComplete');
        // }

       
        function reload() {
            console.log('Reloading in 2 seconds');
            setTimeout(function() {
                $ionicLoading.hide();
                window.location.reload();
            }, 1000);
        }

        function reset() {
            console.log('Resetting');

            $ionicLoading.show({
                template: 'Loading...'
            });

            basket.clear();
            reload();
        }

        function update() {
            console.log('Reloading from Github');

            $ionicLoading.show({
                template: 'Loading...'
            });


            // use basket to reload from github
            basket.clear();

            var time = new Date().getTime();
            var files = [{
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/vendor.js?time=' + time,
                key: 'scripts/vendor.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/scripts.js?time=' + time,
                key: 'scripts/scripts.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/templates.js?time=' + time,
                key: 'scripts/templates.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/styles/vendor.css?time=' + time,
                key: 'styles/vendor.css',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/styles/style.css?time=' + time,
                key: 'styles/style.css',
                execute: false
            }];

            console.log('Files to load');
            console.log(files);

            basket.require.apply(null, files).then(function(stuff) {
                console.log('New files cached, about to reload');
                console.log('Templates:');
                console.log(basket.get('scripts/templates.js'));
                console.log('RELOAD FILES:');
                console.log(stuff);

                $scope.$broadcast('scroll.refreshComplete');
                console.log('FUUUCCCCCKKKK');
                reload();
            }, function() {
                console.log('Failed to get from Github!');
            });
        }

        // function doRefresh() {
        //     activate();
        // }
    });
