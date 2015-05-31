// Ionic Starter App

console.log('APP JS LOADED!!!');

var seconds2 = new Date().getTime() / 1000;

console.log('seconds ' + seconds);

console.log('IT TOOK ' + (seconds2 - seconds) + ' seconds');

angular.module('templates', []);
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('cats', ['ionic', 'ngCordova', 'templates']);

    app.config(function($stateProvider, $urlRouterProvider) {
        console.log('config running, adding routes!');
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
                templateUrl: 'templates/movieDetails.html',
                controller: 'MovieDetailsCtrl'
            })
            .state('showings', {
                url: '/showings/:showId',
                templateUrl: 'templates/showings.html',
                controller: 'ShowingsCtrl'
            })
    })
    .run(function($ionicPlatform, $state, $templateCache) {
        $ionicPlatform.ready(function() {
            console.log('device is now ready!');
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })


.controller('MoviesCtrl', function($scope, $http, $rootScope, $stateParams) {
        $scope.cinemaLocation = $stateParams.cinemaLocation;
        console.log($stateParams.cinemaLocation);
        // $http.get('http://api.moviesowl.com/v1/cinemas/12/movies?starting_after=1430870401').then(function(response) {
        $http.get('http://api.moviesowl.com/v1/cinemas/' + $stateParams.cinemaId + '/movies').then(function(response) {
            $rootScope.movies = response.data.data;
            $scope.movies = _.chunk($rootScope.movies, 2);
        });
    })
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
    })
    .controller('ShowingsCtrl', function($scope, $stateParams, $rootScope) {


    })
    .controller('CinemasCtrl', function($scope, $http) {

        $http.get('http://api.moviesowl.com/v1/cinemas').then(function(response) {
            $scope.cinemas = response.data.data;
        });
    });



    angular.element(document).ready(function() {
        console.log('Bootstrap app now!');
      angular.bootstrap(document, ['cats']);
    });
