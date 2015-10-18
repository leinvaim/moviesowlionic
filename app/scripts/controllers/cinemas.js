(function () {

    'use strict';
    angular
        .module('moviesowlApp')
        .controller('CinemasController', CinemasController);

    /* @ngInject */
    function CinemasController($http, ENV, $scope, $state, $ionicHistory, $stateParams) {
        /* jshint validthis: true */

        activate();
        $scope.goToMovies = goToMovies;

        ////////////////

        function activate() {
            var cinemaObj = angular.fromJson(localStorage.cinema);
            $scope.cinemaLocation = cinemaObj.location;

            $http.get(ENV.apiEndpoint + 'cities/' + $stateParams.city + '/cinemas').then(function(response) {
                $scope.cinemas = response.data.data;
            });
        }

        function goToMovies(cinema) {
            window.localStorage.cinema = angular.toJson(cinema);
            $ionicHistory.nextViewOptions({
                //disableAnimate: true,
                disableBack: true
            });
            $state.go('movies');
        }
    }

})();
