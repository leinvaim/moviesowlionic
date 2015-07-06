'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:MoviedetailsCtrl
 * @description
 * # MoviedetailsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('MovieDetailsCtrl', function($scope, $stateParams, $http, selectedMovieService, showingsDataService,
        $state) {
        // $scope.movie = _.find($rootScope.movies, function(movie) {
        //     return movie.id == $stateParams.movieId;
        // });
        $scope.movie = selectedMovieService.selectedMovie;
        $scope.showingsData = $scope.movie.showings.data;

        // if ($scope.movie.tomato_meter < 60) {
        //     $scope.rottenLogo = 'http://leinvaim.github.io/moviesowlionic/images/rotten.png';
        // }
        // if ($scope.movie.tomato_meter > 59) {
        //     $scope.rottenLogo = 'http://leinvaim.github.io/moviesowlionic/images/fresh.png';
        // }
        // if ($scope.movie.tomato_meter > 74) {
        //     $scope.rottenLogo = 'http://leinvaim.github.io/moviesowlionic/images/CF_240x240.png';
        // }



        _.forEach($scope.showingsData, function(showing) {
            $http.get('http://api.moviesowl.com/v1/showings/' + showing.id).then(function(response) {
                var tempSeats = response.data;
                var seatsInfo = response.data.seats;
                var totalNumOfSeats = 0;
                var takenSeats = 0;
                for (var row = 0; row < seatsInfo.length; row++) {
                    for (var col = 0; col < seatsInfo[row].length; col++) {
                        if (seatsInfo[row][col] === 'available') {
                            totalNumOfSeats++;
                        }
                        if (seatsInfo[row][col] === 'taken') {
                            totalNumOfSeats++;
                            takenSeats += 1;
                        }
                    }
                }

                showing.totalNumOfSeats = totalNumOfSeats;
                showing.cinemaSize = getCinemaSize(totalNumOfSeats);
                showing.fullness = getFullness(totalNumOfSeats, takenSeats);
                showing.seats = seatsInfo;
                showingsDataService.setShowingsData($scope.showingsData);
            });
        });
        $scope.openSeatView = function(sessionId) {
            var seatsData = _.find($scope.showingsData, function(showing) {
                return showing.id === parseInt(sessionId);
            });

            if (seatsData.seats && seatsData.seats.length > 0) {
                console.log('am i here');
                $state.go('seats', {
                    showId: sessionId
                });
            }
        };

        function getCinemaSize(totalSeats) {
            console.log(totalSeats);
            if (totalSeats < 150) {
                return 'Small';
            } else if (totalSeats < 200) {
                return 'Medium';
            } else {
                return 'Large';
            }

        }

        function getFullness(totalSeats, takenSeats) {
            if (totalSeats === 0 && takenSeats === 0) {
                return 'not available';
            }

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
