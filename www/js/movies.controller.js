'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('MoviesController', function(ENV, $scope, $http, $rootScope, $stateParams, selectedMovieService, $state,
                                       $ionicLoading, $ionicPopup, $ionicModal, cinemasList, $ionicHistory, craigalytics) {

        console.log('movis conro');
        $scope.doRefresh = doRefresh;
        $scope.toggleViewMode = toggleViewMode;
        $scope.setStartingTime = setStartingTime;
        $scope.showTimesModal = showTimesModal;
        $scope.isStartingSoon = isStartingSoon;

        $scope.mode = getViewMode();

        ///

        $scope.$on('$ionicView.enter', onEnter);

        function onEnter() {
            if(!hasPreferredCinema()) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $state.go('cities');
                return;
            }
            $scope.startingAfter = getCurrentTime();
            var time = Math.round($scope.startingAfter.getTime() / 1000);
            return loadMovies(false, time);
        }

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

        function getMoviesForCinema(cinemaId, time) {
            if(!time) {
                time = Math.round((new Date()).getTime() / 1000);
            }
            return $http.get(ENV.apiEndpoint + 'cinemas/' + cinemaId +
            '/movies?starting_after=' + time).then(function(response) {
                return response.data;
            });
        }
        function loadMovies(force, startingAfterTime) {
            var cinemaObj = angular.fromJson(localStorage.cinema);
            if(cinemaObj.location === $scope.cinemaLocation && !force) {
                return;
            }
            $scope.cinemaLocation = cinemaObj.location;

            craigalytics.send('VIEWED_CINEMA', {
                name: $scope.cinemaLocation
            });

            $ionicLoading.show({
                template: '<ion-spinner class="bubbles"></ion-spinner>',
                noBackdrop: true
            });

            getMoviesForCinema(cinemaObj.id, startingAfterTime).then(function(moviesData) {
                _.each(moviesData.data, function(movie) {
                    movie.stars = movie.tomato_meter / 25;
                });
                $rootScope.movies = moviesData.data; //I dont actually use this anymore

                $scope.groups = [{
                    name: 'Great Movies',
                    style: 'great-movies',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter >= 70;
                    }), 2)
                }, {
                    name: 'Good Movies',
                    style: 'good-movies',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter >= 50 && movie.tomato_meter < 70;
                    }), 2)
                }, {
                    name: 'Bad Movies',
                    style: 'bad-movies',
                    movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                        return movie.tomato_meter < 50 && movie.tomato_meter >= 0;
                    }), 2)
                }, {
                    name: 'No Rating Movies',
                    style: 'no-ratings',
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
                    template: 'Failed to load movies, Please try again!'
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
            var time = Math.round($scope.startingAfter.getTime() / 1000);
            loadMovies(true, time);
        }

        /**
         * Check if start time is < 1hr from now
         * @param startTime
         * @returns {boolean}
         */
        function isStartingSoon(startTime) {
            var date = new Date();
            var currentTime = date.getTime() / 1000;
            var oneHourBeforeStartTime = startTime - (60*60);
            return  currentTime > oneHourBeforeStartTime;
        }


        function getViewMode() {
            return localStorage.viewMode || 'list';
        }

        function toggleViewMode() {
            console.log('toggling view mode');
            var mode = '';
            if($scope.mode === 'list') {
                mode = 'grid';
            } else {
                mode = 'list';
            }
            $scope.mode = mode;
            localStorage.viewMode = mode;
        }



        var appCache = window.applicationCache;

        function handleCacheEvent(e) {
            console.log('haha');
            console.log(e);
        }

        function handleCacheError(e) {
            // window.alert('Error: Cache failed to update!');
        }

        function updateFound(e) {
            console.log(e);
            console.log('update found');
            $scope.$apply(function(){
                $scope.hasUpdate = true;
            });
        }

        function getProgress(e) {
            console.log(e);
            $scope.$apply(function(){
                $scope.progressWidth = e.loaded / e.total * 100;
                console.log('progress 2', $scope.progressWidth);
                if($scope.progressWidth === 100) {
                    $scope.hasUpdate = false;
                    // alert
                    //var confirmPopup = $ionicPopup.confirm({
                    //    title: 'New Update!',
                    //    template: 'Y\'all ready for this?'
                    //});
                    //confirmPopup.then(function(res) {
                    //    if(res) {
                    //        window.location.href = 'http://leinvaim.github.io/moviesowlionic/index.html';
                    //    } else {
                    //        console.log('Later');
                    //    }
                    //});

                }
            });
        }

// Fired after the first cache of the manifest.
        appCache.addEventListener('cached', handleCacheEvent, false);

// Checking for an update. Always the first event fired in the sequence.
        appCache.addEventListener('checking', handleCacheEvent, false);

// An update was found. The browser is fetching resources.
        appCache.addEventListener('downloading', updateFound, false);

// The manifest returns 404 or 410, the download failed,
// or the manifest changed while the download was in progress.
        appCache.addEventListener('error', handleCacheError, false);

// Fired after the first download of the manifest.
        appCache.addEventListener('noupdate', handleCacheEvent, false);

// Fired if the manifest file returns a 404 or 410.
// This results in the application cache being deleted.
        appCache.addEventListener('obsolete', handleCacheEvent, false);

// Fired for each resource listed in the manifest as it is being fetched.
        appCache.addEventListener('progress', getProgress, false);

// Fired when the manifest resources have been newly redownloaded.
        appCache.addEventListener('updateready', handleCacheEvent, false);
    });
