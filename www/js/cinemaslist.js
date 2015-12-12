'use strict';

/**
 * @ngdoc service
 * @name moviesowlApp.cinemasList
 * @description
 * # cinemasList
 * Factory in the moviesowlApp.
 */
angular.module('moviesowlApp')
    .factory('cinemasList', function() {
        // Service logic
        // ...

        var meaningOfLife = 42;




        var cinemas = [{
            'id': 1,
            'location': 'Australia Fair Cinemas'
        }, {
            'id': 2,
            'location': 'Brisbane City Myer Centre'
        }, {
            'id': 3,
            'location': 'Browns Plains'
        }, {
            'id': 4,
            'location': 'Cairns Central'
        }, {
            'id': 5,
            'location': 'Cairns City'
        }, {
            'id': 6,
            'location': 'Cairns Earlville'
        }, {
            'id': 7,
            'location': 'Capalaba'
        }, {
            'id': 8,
            'location': 'Carindale'
        }, {
            'id': 9,
            'location': 'Chermside'
        }, {
            'id': 10,
            'location': 'Coolangatta'
        }, {
            'id': 11,
            'location': 'Garden City Mt Gravatt'
        }, {
            'id': 12,
            'location': 'Indooroopilly'
        }, {
            'id': 13,
            'location': 'Ipswich'
        }, {
            'id': 14,
            'location': 'Loganholme'
        }, {
            'id': 15,
            'location': 'Mackay City'
        }, {
            'id': 16,
            'location': 'Mackay Mount Pleasant'
        }, {
            'id': 17,
            'location': 'Maroochydore Sunshine Plaza'
        }, {
            'id': 18,
            'location': 'Moonlight Cinema Brisbane'
        }, {
            'id': 19,
            'location': 'Morayfield'
        }, {
            'id': 20,
            'location': 'Noosa Cinemas'
        }, {
            'id': 21,
            'location': 'Robina'
        }, {
            'id': 22,
            'location': 'Rockhampton North'
        }, {
            'id': 23,
            'location': 'Strathpine'
        }, {
            'id': 24,
            'location': 'Toombul'
        }, {
            'id': 25,
            'location': 'Toowoomba Grand Central'
        }, {
            'id': 26,
            'location': 'Toowoomba Strand'
        }, {
            'id': 27,
            'location': 'Townsville Central'
        }, {
            'id': 28,
            'location': 'Townsville City'
        }, {
            'id': 29,
            'location': 'Moonlight Cinema Port Douglas'
        }];

        var service = {
            cinemas: cinemas
        };
        return service;
    });
