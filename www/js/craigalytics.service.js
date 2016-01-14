(function () {

    'use strict';
    angular
        .module('moviesowlApp')
        .factory('craigalytics', craigalytics);

    /* @ngInject */
    function craigalytics($http, $q, ENV) {

        var registrationDeferred = $q.defer();

        var service = {
            register: register,
            send: send
        };

        return service;

        ////////////////

        function register() {
            if(ENV.name !== 'production') {
                registrationDeferred.reject();
                return registrationDeferred.promise;
            }

            if (!localStorage.device_id) {
                console.log('Registering device with craigalytics');
                $http.post('http://128.199.104.251/craigalytics/current/public/api/devices')
                    .then(function (response) {
                        localStorage.device_id = response.data.id;
                        localStorage.device_name = response.data.name;
                        console.log('Craigalytics: ' + localStorage.device_id);
                        registrationDeferred.resolve();
                    });
                return registrationDeferred.promise;
            } else {
                registrationDeferred.resolve();
                return registrationDeferred.promise;
            }
        }

        function send(name, metadata) {
            return registrationDeferred.promise.then(function() {
                metadata = metadata || [];
                return $http.post('http://128.199.104.251/craigalytics/current/public/api/events', {
                    name: name,
                    device_id: localStorage.device_id,
                    metadata: metadata
                }).then(function (response) {
                    console.log('Craigalytics: APP_OPENED');
                });
            });
        }
    }

})();
