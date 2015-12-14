(function () {

    'use strict';
    angular
        .module('moviesowlApp')
        .controller('AccountController', AccountController);

    /* @ngInject */
    function AccountController($scope) {
        /* jshint validthis: true */
        //var vm = this;

        //vm.activate = activate;
        //vm.title = 'Accounts';

        activate();

        ////////////////

        function activate() {
            var cinemaObj = angular.fromJson(localStorage.cinema);
            if(cinemaObj.location === $scope.cinemaLocation && !force) {
                return;
            }
            $scope.cinemaLocation = cinemaObj.location;
        }
    }

})();
