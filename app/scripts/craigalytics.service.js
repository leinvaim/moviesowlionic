(function () {

    'use strict';
    angular
        .module('moviesowlApp')
        .factory('craigalytics', craigalytics);

    /* @ngInject */
    function craigalytics($http, $q) {
        var service = {
            register: register,
            send: send
        };

        return service;

        ////////////////

        function register() {
            if (!localStorage.device_id) {
                console.log('Registering device with craigalytics');
                return $http.post('http://128.199.104.251/craigalytics/current/public/api/devices')
                    .then(function (response) {
                        localStorage.device_id = response.data.id;
                        console.log('Craigalytics: ' + localStorage.device_id);
                    });
            }
            return $q.when();
        }

        function send(name, metadata) {
            metadata = metadata || [];
            return $http.post('http://128.199.104.251/craigalytics/current/public/api/events', {
                name: name,
                device_id: localStorage.device_id,
                metadata: metadata
            }).then(function (response) {
                console.log('Craigalytics: APP_OPENED');
            });
        }
    }

})();
