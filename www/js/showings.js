'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:ShowingsCtrl
 * @description
 * # ShowingsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('ShowingsCtrl', function(ENV, $scope, $stateParams, $http, selectedMovieService, showingsDataService,
        $state, $q, $ionicModal, $rootScope, $ionicHistory, $timeout, craigalytics, $sce) {

        activate();

        function activate() {
            getMovie().then(function(movie) {
                $scope.movie = movie;
                craigalytics.send('VIEWED_MOVIE', {
                    name: movie.title
                });
            }).then(doStuff);
        }

        function getMovie() {

            if (selectedMovieService.selectedMovie.id) {
                return $q.when(selectedMovieService.selectedMovie);
            }
            return $http.get(ENV.apiEndpoint + 'cinemas/12/movies').then(function(response) {
                var movies = response.data.data;
                selectedMovieService.selectedMovie = _.find(movies, {
                    id: parseInt($stateParams.movieId)
                });
                return selectedMovieService.selectedMovie;
            });
        }

        function getRottenTomatoLogo(movie) {
            if (movie.tomato_meter < 60) {
                return 'img/rotten.png';
            }
            if (movie.tomato_meter < 75) {
                return 'img/fresh.png';
            }
            return 'img/CF_240x240.png';
        }

        function getOwlRating(movie) {
            if (movie.tomato_meter < 50) {
                return 'Bad Movie';
            }
            if (movie.tomato_meter < 70) {
                return 'Good Movie';
            }
            return 'Great Movie';
        }

        function getOwlColor(movie) {
            if (movie.tomato_meter < 50) {
                return 'red';
            }
            if (movie.tomato_meter < 70) {
                return '#DABF00';
            }
            return '#1CC56A';
        }

        function doStuff() {
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
            }

            $scope.showingsData = $scope.movie.showings.data;
            $scope.rottenLogo = getRottenTomatoLogo($scope.movie);
            $scope.owlRating = getOwlRating($scope.movie);
            $scope.textColour = getOwlColor($scope.movie);

            _.forEach($scope.showingsData, function(showing) {
                $http.get(ENV.apiEndpoint + 'showings/' + showing.id).then(function(response) {
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
                    showing.hasSeats = totalNumOfSeats === 0 && takenSeats === 0;
                    showing.seats = seatsInfo;
                    showingsDataService.setShowingsData($scope.showingsData);
                });
            });
        }


        $scope.openTrailer = function() {
            $scope.menuState = 'closed';
            console.log('show trailer', $stateParams.movieId);
            $state.go('movieDetails', {
                movieId: $stateParams.movieId
            });
        }

        $scope.showMovieTitle = true;
        $scope.showHideMovieTitle = function(){
            $scope.showMovieTitle = !$scope.showMovieTitle;
        }

        $scope.openSeatView = function(sessionId) {
            $scope.menuState = 'closed';
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
                return 'No seating info';
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
        $ionicModal.fromTemplateUrl('templates/movieDetails.html', {
            scope: $scope,
            animation: 'scale-in'
        }).then(function(modal) {
            $scope.modal = modal;
        });



        $scope.openModal = function() {
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
    });
