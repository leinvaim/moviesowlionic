'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:SeatsCtrl
 * @description
 * # SeatsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
  .controller('SeatsCtrl', function($scope, $http, $stateParams, showingsDataService) {

        //$http.get('http://api.moviesowl.com/v1/showings/' + $stateParams.showId).then(function(response) {
        //  $http.get('http://api.moviesowl.com/v1/showings/141061').then(function(response) {

        var seatsData = _.find(showingsDataService.showingsData, function(showing) {
            return showing.id === parseInt($stateParams.showId);
        });
        console.log(seatsData);
        // var seatsData = response.data;
        $scope.seatingPlan = seatsData.seats;

        var numOfSeatInRow = $scope.seatingPlan[0].length;
        $scope.seatWidth = 100 / numOfSeatInRow;
        // console.log(seatsData);

  });
