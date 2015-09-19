'use strict';

/**
 * @ngdoc service
 * @name moviesowlApp.selectedMovieService
 * @description
 * # selectedMovieService
 * Factory in the moviesowlApp.
 */
angular.module('moviesowlApp')
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
