'use strict';

//ga('send', 'pageview', {'page': '/my/phone'});


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('moviesowlApp', ['ionic',
    'config',
    'angulartics',
    'angulartics.google.analytics',
    'angularMoment',
    'ion-affix',
    'ionic.rating',
    'ngIOS9UIWebViewPatch'])

    .run(function ($ionicPlatform, amMoment, $rootScope, ENV, $document, $http, craigalytics) {
        amMoment.changeLocale('en');
        $rootScope.ENV = ENV;


        console.log(ENV);

        craigalytics.register().then(function() {
            craigalytics.send('APP_OPENED');
        });

        $ionicPlatform.ready(function () {

            $ionicPlatform.ready(function () {
                if (navigator.splashscreen) {
                    setTimeout(function () {
                        navigator.splashscreen.hide();
                    }, 100);
                }
            });

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
                //console.log('statusbar', StatusBar);
                //StatusBar.overlaysWebView(true);
                //StatusBar.style(1); //Light
            }
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if (toState.changeColor) {
                    $rootScope.changeColor = true;
                } else {
                    $rootScope.changeColor = false;
                }
            });
            //$rootScope.$on('$stateChangeSuccess', function (evt, toState) {
            //    console.log('stateChangeSuccess');
            //    if (toState.changeColor) {
            //        $rootScope.changeColor = true;
            //    } else {
            //        $rootScope.changeColor = false;
            //    }
            //});
        });


    })

    .config(function ($stateProvider, $urlRouterProvider) {
        console.log('Config running, adding routes!');
        $urlRouterProvider.otherwise('/movies');
        $stateProvider
            // .state('cinemas', {
            //     url: '/cinemas',
            //     templateUrl: 'templates/cinemas.html',
            //     controller: 'CinemasCtrl'
            // })
            .state('cities', {
                url: '/cities',
                templateUrl: 'templates/cities.html',
                controller: 'CitiesController'
            })
            .state('cinemas', {
                url: '/cinemas?city',
                templateUrl: 'templates/cinemas-page.html',
                controller: 'CinemasController'
            })
            .state('movies', {
                url: '/movies',
                templateUrl: 'templates/movies.html',
                controller: 'MoviesCtrl'
            })
            .state('movie', {
                url: '/movie/:movieId',
                templateUrl: 'templates/movieDetails.html',
                controller: 'MovieDetailsCtrl'
            })
            .state('showings', {
                url: '/showings/:movieId',
                templateUrl: 'templates/showings.html',
                controller: 'ShowingsCtrl',
                changeColor: true
            })
            .state('seats', {
                url: '/seats/:showId',
                templateUrl: 'templates/seats.html',
                controller: 'SeatsCtrl'
            });
    });