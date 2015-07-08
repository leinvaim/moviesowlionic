'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:SeatsCtrl
 * @description
 * # SeatsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('SeatsCtrl', function($scope, $http, $stateParams, showingsDataService, selectedMovieService) {

        //$http.get('http://api.moviesowl.com/v1/showings/' + $stateParams.showId).then(function(response) {
        //  $http.get('http://api.moviesowl.com/v1/showings/141061').then(function(response) {

        $scope.doRefresh = doRefresh;
        $scope.movie = selectedMovieService.selectedMovie;

        console.log(showingsDataService);
        var seatsData = _.find(showingsDataService.showingsData, function(showing) {
            return showing.id === parseInt($stateParams.showId);
        });
        console.log(seatsData);
        $scope.session = seatsData;
        // var seatsData = response.data;
        $scope.seatingPlan = seatsData.seats;

        var numOfSeatInRow = $scope.seatingPlan[0].length;
        $scope.seatWidth = 100 / numOfSeatInRow;
        // console.log(seatsData);
        function doRefresh() {
            console.log('Reloading Seats');
            $http.get('http://api.moviesowl.com/v1/showings/' + $stateParams.showId).then(function(response) {
                $scope.seatingPlan = response.data.seats;
                $scope.$broadcast('scroll.refreshComplete');
            }, function() {
                $scope.$broadcast('scroll.refreshComplete');
            });

        }

    });
