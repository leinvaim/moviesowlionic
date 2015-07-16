'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('MoviesCtrl', function($scope, $http, $rootScope, $stateParams, selectedMovieService, $state,
        $ionicLoading, $ionicPopup, $ionicModal, cinemasList) {

        $scope.doRefresh = doRefresh;
        $scope.openModal = openModal;
        $scope.closeModal = closeModal;
        $scope.closeModalOnly = closeModalOnly;
        $scope.toggleViewMode = toggleViewMode;
        $scope.setStartingTime = setStartingTime;
        $scope.showTimesModal = showTimesModal;

        $scope.cinemaLocation = $stateParams.cinemaLocation;
        $scope.cinemas = cinemasList.cinemas;

        $scope.mode = getViewMode();

        activate();

        ///

        function getPossibleStartingTimes() {
            var times = [
                getCurrentTime()
            ];

            var nextTime = new Date(getCurrentTime().getTime());
            nextTime.setHours(nextTime.getHours() + 1);
            nextTime.setMinutes(0);

            for (var i = nextTime.getHours(); i < 24; i++) {
                var time = new Date(nextTime.getTime());
                time.setHours(i);
                times.push(time);
            }
            return times;
        }

        function activate() {
            $scope.startingAfter = getCurrentTime();

            if (hasPreferredCinema()) {
                loadMovies();
            }

            setupModal().then(showPreferredCinemasModalIfNeeded);

            $ionicModal.fromTemplateUrl('templates/times.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.timesModal = modal;
            });
        }

        function getCurrentTime() {
            return new Date();
        }

        function showTimesModal() {
            $scope.times = getPossibleStartingTimes();
            $scope.timesModal.show();
        }
        /**
         * Changes the starting hour to search from
         *
         * Only show movies starting after 4pm, or 8pm
         * @param time
         */
        function setStartingTime(time) {
            $scope.timesModal.hide();
            $scope.startingAfter = time;
            loadMovies();
        }

        function hasPreferredCinema() {
            return !!window.localStorage.cinema;
        }

        function setupModal() {
            return $ionicModal.fromTemplateUrl('templates/cinemas.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });
        }

        /**
         * Shows the preferred cinema modal if they haven't setup one
         */
        function showPreferredCinemasModalIfNeeded() {
            if (!hasPreferredCinema()) {
                $scope.openModal();
            }
        }

        function openModal() {
            $scope.modal.show();
        }

        function closeModal(cinemaObj) {
            window.localStorage.cinema = angular.toJson(cinemaObj);
            $scope.modal.hide();
            loadMovies();
        }

        function closeModalOnly(cinemaObj) {
            $scope.modal.hide();
        }


        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

        function getMoviesForCinema(cinemaId, time) {
            if(!time) {
                time = Math.round((new Date()).getTime() / 1000);
            }
            return $http.get('http://api.moviesowl.com/v1/cinemas/' + cinemaId +
            '/movies?starting_after=' + time).then(function(response) {
                return response.data;
            });
        }
        function loadMovies() {
            $ionicLoading.show({
                template: '<ion-spinner class="bubbles"></ion-spinner>',
                noBackdrop: true
            });
            var cinemaObj = angular.fromJson(localStorage.cinema);
            $scope.cinemaLocation = cinemaObj.location;

            var time = Math.round($scope.startingAfter.getTime() / 1000);
            getMoviesForCinema(cinemaObj.id, time).then(function(moviesData) {
                $rootScope.movies = moviesData.data; //I dont actually use this anymore

                $scope.groups = [{
                    name: 'Great Movies',
                    style: 'balanced',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter >= 70;
                    }), 2)
                }, {
                    name: 'Good Movies',
                    style: 'energized',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter >= 50 && movie.tomato_meter < 70;
                    }), 2)
                }, {
                    name: 'Bad Movies',
                    style: 'assertive',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter < 50 && movie.tomato_meter >= 0;
                    }), 2)
                }, {
                    name: 'No Rating Movies',
                    style: 'dark',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter < 0;
                    }), 2)
                }];
                
                $scope.hasNoMovies = false;
                if (moviesData.data.length < 1) {
                    $scope.hasNoMovies = true;
                }
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            }, function() {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                var alertPopup = $ionicPopup.alert({
                    title: 'Sorry :(',
                    template: 'Failed to load movies, /n Please try again!'
                });

            });
        }

        $scope.selectMovie = function(movie) {
            selectedMovieService.setMovie(movie);
            $state.go('showings', {
                movieId: movie.id
            });
        };

        function doRefresh() {
            console.log('Reloading Movies');
            $scope.startingAfter = getCurrentTime();
            loadMovies();
        }


        function getViewMode() {
            return localStorage.viewMode || 'list';
        }

        function toggleViewMode() {
            var mode = '';
            if($scope.mode === 'list') {
                mode = 'grid';
            } else {
                mode = 'list';
            }
            $scope.mode = mode;
            localStorage.viewMode = mode;
        }
    });
