'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:CinemasCtrl
 * @description
 * # CinemasCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('CinemasCtrl', function($scope, $http, $ionicLoading) {

        console.log('In cinemas controller');

        // $scope.doRefresh = doRefresh;
        $scope.update = update;
        $scope.reset = reset;

        // activate();

        // ////

        // function activate() {
        //     $http.get('http://api.moviesowl.com/v1/cinemas', {cache: true}).then(function(response) {
        //         console.log('hehe');
        //         $scope.cinemas = response.data.data;
        //     });
        //     console.log('im here!');
        //     $scope.$broadcast('scroll.refreshComplete');
        // }

        $scope.cinemas = [{
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

        function reload() {
            console.log('Reloading in 2 seconds');
            setTimeout(function() {
                $ionicLoading.hide();
                window.location.reload();
            }, 1000);
        }

        function reset() {
            console.log('Resetting');

            $ionicLoading.show({
                template: 'Loading...'
            });

            basket.clear();
            reload();
        }

        function update() {
            console.log('Reloading from Github');

            $ionicLoading.show({
                template: 'Loading...'
            });


            // use basket to reload from github
            basket.clear();

            var files = [{
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/vendor.js',
                key: 'scripts/vendor.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/scripts.js',
                key: 'scripts/scripts.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/templates.js',
                key: 'scripts/templates.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/styles/vendor.css',
                key: 'styles/vendor.css',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/styles/style.css',
                key: 'styles/style.css',
                execute: false
            }];

            basket.require.apply(null, files).then(function(stuff) {
                console.log('New files cached, about to reload');
                console.log('Templates:');
                console.log(basket.get('scripts/templates.js'));
                console.log('RELOAD FILES:');
                console.log(stuff);

                $scope.$broadcast('scroll.refreshComplete');
                reload();
            }, function() {
                console.log('Failed to get from Github!');
            });
        }

        // function doRefresh() {
        //     activate();
        // }
    });
