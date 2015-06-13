'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:MoviedetailsCtrl
 * @description
 * # MoviedetailsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
  .controller('MovieDetailsCtrl', function($scope, $stateParams, $rootScope, $http) {
        $scope.movie = _.find($rootScope.movies, function(movie) {
            return movie.id == $stateParams.movieId;
        });
        var sessionIds = _.pluck($scope.movie.showings.data, 'id');
        console.log(sessionIds);
        $scope.sessionsInfo = [];

        _.forEach(sessionIds, function(sessionId) {
            $http.get('http://api.moviesowl.com/v1/showings/' + sessionId).then(function(response) {
                var tempSeats = response.data;
                var seatsInfo = response.data.seats;
                var totalNumOfSeats = tempSeats.seats_count;
                var takenSeats = 0;
                for (var row = 0; row < seatsInfo.length; row++) {
                    for (var col = 0; col < seatsInfo[row].length; col++) {
                        if (seatsInfo[row][col] === 'taken') {
                            takenSeats += 1;
                        }
                    }
                }
                tempSeats.totalNumOfSeats = totalNumOfSeats;
                tempSeats.cinemaSize = getCinemaSize(totalNumOfSeats);
                tempSeats.fullness = getFullness(totalNumOfSeats, takenSeats);
                $scope.sessionsInfo.push(tempSeats);
                console.log($scope.sessionsInfo);
            });
        });

        function getCinemaSize(totalSeats) {
            if (totalSeats > 200) {
                return 'Large';
            } else if (totalSeats > 150) {
                return 'Medium';
            } else {
                return 'Small';
            }

        }

        function getFullness(totalSeats, takenSeats) {
            var percentage = parseInt(takenSeats / totalSeats * 100);
            if (percentage > 80) {
                return 'Full';
            } else if (percentage > 30) {
                return 'Almost Full';
            } else {
                return percentage + '% Full';
            }
        }
  });
