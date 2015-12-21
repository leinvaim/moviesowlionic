(function () {

    'use strict';
    angular
        .module('moviesowlApp')
        .controller('AccountController', AccountController);

    /* @ngInject */
    function AccountController($scope, autoupdate) {
        /* jshint validthis: true */
        //var vm = this;

        //vm.activate = activate;
        //vm.title = 'Accounts';

        activate();

        $scope.$on('$ionicView.enter', function(e) {
            autoupdate.check();
        });
        $scope.autoupdate = autoupdate;


        ////////////////

        function activate() {
            if(!localStorage.cinema) {
                $scope.cinemaLocation = 'No cinema';
            }
            var cinemaObj = angular.fromJson(localStorage.cinema);
            $scope.cinemaLocation = cinemaObj.location;
        }
    }

})();
