'use strict';



//ga('send', 'pageview', {'page': '/my/phone'});


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('moviesowlApp', ['ionic', 'angulartics', 'angulartics.google.analytics', 'angularMoment', 'ion-affix'])

.run(function($ionicPlatform, amMoment) {
    amMoment.changeLocale('en');
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
    $urlRouterProvider.otherwise('/cinemas');
    $stateProvider
        .state('cinemas', {
            url: '/cinemas',
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