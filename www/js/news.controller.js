(function () {

    'use strict';
    angular
        .module('moviesowlApp')
        .controller('NewsController', NewsController);

    /* @ngInject */
    function NewsController() {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'News';

        activate();

        ////////////////

        function activate() {
        }
    }

})();
