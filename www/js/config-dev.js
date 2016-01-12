"use strict";

angular.module('config', [])

    .constant('ENV', {
        name: 'development',
        apiEndpoint: 'http://moviesowl.com/api/v1/',
        posterEndpoint: 'http://moviesowl.com/'
    })

;