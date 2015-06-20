'use strict';

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-51312192-5', {
    'storage' : 'none', // no cookies
    'cookieDomain' :'none', // no domain
    'clientId':'92bf24a5-20e5-4181-9778-2835f28c52d8'
});
ga('set', 'checkProtocolTask', null);
//ga('send', 'pageview', {'page': '/my/phone'});


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('moviesowlApp', ['ionic', 'angulartics', 'angulartics.google.analytics'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {
    console.log('Config running, adding routes!');
    $urlRouterProvider.otherwise('/');
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
        .state('seats', {
            url: '/seats/:showId',
            templateUrl: 'templates/seats.html',
            controller: 'SeatsCtrl'
        });
});


/*
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
                templateUrl: 'templates/movieDetails.html',
                controller: 'MovieDetailsCtrl'
            })
            .state('showings', {
                url: '/showings/:showId',
                templateUrl: 'templates/showings.html',
                controller: 'ShowingsCtrl'
            })
            .state('seats', {
                url: '/seats/:showId',
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
    });

 */
