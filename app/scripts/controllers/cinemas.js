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

        // function doRefresh() {
        //     activate();
        // }
    });
