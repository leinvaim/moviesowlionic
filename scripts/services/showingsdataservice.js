'use strict';

/**
 * @ngdoc service
 * @name moviesowlApp.showingsDataService
 * @description
 * # showingsDataService
 * Factory in the moviesowlApp.
 */
angular.module('moviesowlApp')
    .factory('showingsDataService', function() {
        // Service logic
        // ...

        var service = {
            setShowingsData: setShowingsData,
            showingsData: []
        };
        return service;


        function setShowingsData(showingsData) {
            service.showingsData = showingsData;
        }
    });
