(function () {

    'use strict';
    angular
        .module('moviesowlApp')
        .controller('CitiesController', CitiesController);

    /* @ngInject */
    function CitiesController($http, ENV, $state, $scope) {

        $scope.goToCity = goToCity;

        activate();

        ////////////////

        function activate() {
            $http.get(ENV.apiEndpoint + 'cities').then(function(response) {
                $scope.cities = response.data.data;
            });
        }

        function goToCity(city) {
            $state.go('cinemas', {city: city.name});
        }
    }

})();
