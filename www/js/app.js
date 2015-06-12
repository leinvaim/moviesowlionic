// Ionic Starter App

angular.module('templates', []);
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('cats', ['ionic', 'ngCordova', 'templates']);

app.config(function($stateProvider, $urlRouterProvider) {
        console.log('Config running, adding routes!');
        $urlRouterProvider.otherwise('/')
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/cinemas.html',
                controller: 'CinemasCtrl'
            })
            .state('movies', {
                url: '/movies/:cinemaId/?cinemaLocation',
                templateUrl: 'templates/movies.html',
                controller: 'MoviesCtrl'
            })
            .state('movie', {
                url: '/movie/:movieId',
                cache: false,
                templateUrl: 'templates/movieDetails.html',
                controller: 'MovieDetailsCtrl'
            })
            .state('showings', {
                url: '/showings/:showId',
                cache: false,
                templateUrl: 'templates/showings.html',
                controller: 'ShowingsCtrl'
            })
            .state('seats', {
                url: '/seats/:showId',
                cache: false,
                templateUrl: 'templates/seats.html',
                controller: 'SeatsCtrl'
            })
    })
    .run(function($ionicPlatform, $state, $templateCache) {
        $ionicPlatform.ready(function() {
            console.log('Device is now ready in angular!');
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            // if (window.cordova && window.cordova.plugins.Keyboard) {
            //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            // }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })


.controller('MoviesCtrl', function($scope, $http, $rootScope, $stateParams, selectedMovieService, $state) {
    $scope.cinemaLocation = $stateParams.cinemaLocation;
    console.log($stateParams.cinemaLocation);
    // $http.get('http://api.moviesowl.com/v1/cinemas/12/movies?starting_after=1430870401').then(function(response) {
    $http.get('http://api.moviesowl.com/v1/cinemas/' + $stateParams.cinemaId + '/movies').then(function(response) {
        $rootScope.movies = response.data.data;
        $scope.movies = _.chunk($rootScope.movies, 2);
    });
    $scope.selectMovie = function(movie) {
        selectedMovieService.setMovie(movie);
        $state.go('movie', {
            movieId: movie.id
        });
    }
})

/*****************************
    Movie Details Controller
*****************************/
.controller('MovieDetailsCtrl', function($scope, $stateParams, $http, selectedMovieService, showingsDataService, 
    $state) {
        // $scope.movie = _.find($rootScope.movies, function(movie) {
        //     return movie.id == $stateParams.movieId;
        // });
        $scope.movie = selectedMovieService.selectedMovie;
        $scope.showingsData = $scope.movie.showings.data;

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
            if (seatsData.seats) {
                console.log('am i here');
                $state.go('seats', {
                    showId: sessionId
                });
            }
        }

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
            var percentage = parseInt(takenSeats / totalSeats * 100);
            if (percentage > 80) {
                return 'Full';
            } else if (percentage > 30) {
                return 'Almost Full';
            } else {
                return percentage + '% Full';
            }
        }
    })
    .controller('ShowingsCtrl', function($scope, $stateParams, $rootScope) {


    })
    /*****************************
        Seats Controller
    *****************************/
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
        console.log(seatsData);

        // });
    })
    /*****************************
        Cinemas Controller
    *****************************/
    .controller('CinemasCtrl', function($scope, $http) {

        console.log('In cinemas controller');

        $scope.doRefresh = doRefresh;

        activate();

        ////

        function activate() {
            $http.get('http://api.moviesowl.com/v1/cinemas').then(function(response) {
                $scope.cinemas = response.data.data;
            });
            console.log('im here!');
        }

        function doRefresh() {
            console.log('Reloading from Github');
            // use basket to reload from github
            basket.clear();

            var files = [{
                url: 'http://leinvaim.github.io/moviesowlionic/www/js/app.js',
                key: 'js/app.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/www/js/templates.js',
                key: 'js/templates.js',
                execute: false
            }];

            basket.require.apply(null, files).then(function() {
                $scope.$broadcast('scroll.refreshComplete');
                window.location.reload();
            });


        }
    })
    .factory('showingsDataService', function() {
        // Service logic
        // ...

        var service = {
            setShowingsData: setShowingsData,
            showingsData: []
        };
        return service;


        function setShowingsData(showingsData) {
            service.showingsData = showingsData;
        }
    })
    .factory('selectedMovieService', function() {
        // Service logic
        // ...

        var service = {
            setMovie: setMovie,
            selectedMovie: {}
        };
        return service;


        function setMovie(movie) {
            console.log('set movie', movie);
            service.selectedMovie = movie;
        }
    });
