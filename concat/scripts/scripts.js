(function() {

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

    localStorage.gaClientId = localStorage.gaClientId || guid();

    ga('create', 'UA-51312192-5', {
        'storage' : 'none', // no cookies
        'cookieDomain' :'none', // no domain
        'clientId': localStorage.gaClientId
    });
    ga('set', 'checkProtocolTask', null);

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

})();
'use strict';



//ga('send', 'pageview', {'page': '/my/phone'});


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('moviesowlApp', ['ionic', 'angulartics', 'angulartics.google.analytics', 'angularMoment', 'ion-affix'])

.run(["$ionicPlatform", "amMoment", function($ionicPlatform, amMoment) {
    amMoment.changeLocale('en');
    $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    console.log('Config running, adding routes!');
    console.log('Is this working?!!?');
    $urlRouterProvider.otherwise('/cinemas');
    $stateProvider
        .state('cinemas', {
            url: '/cinemas',
            templateUrl: 'templates/cinemas.html',
            controller: 'CinemasCtrl'
        })
        .state('movies', {
            url: '/movies/:cinemaId/?cinemaLocation',
            templateUrl: 'templates/movies.html',
            controller: 'MoviesCtrl'
        })
        .state('movie', {
            url: '/movie/:movieId',
            templateUrl: 'templates/movieDetails.html',
            controller: 'MovieDetailsCtrl'
        })
        .state('showings', {
            url: '/showings/:showId',
            templateUrl: 'templates/showings.html',
            controller: 'ShowingsCtrl'
        })
        .state('seats', {
            url: '/seats/:showId',
            templateUrl: 'templates/seats.html',
            controller: 'SeatsCtrl'
        });
}]);
"use strict";

 angular.module('config', [])

.constant('ENV', {name:'production',apiEndpoint:'http://api.yoursite.com/'})

;
'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:CinemasCtrl
 * @description
 * # CinemasCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('CinemasCtrl', ["$scope", "$http", "$ionicLoading", function($scope, $http, $ionicLoading) {

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

            var time = new Date().getTime();
            var files = [{
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/vendor.js?time=' + time,
                key: 'scripts/vendor.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/scripts.js?time=' + time,
                key: 'scripts/scripts.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/scripts/templates.js?time=' + time,
                key: 'scripts/templates.js',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/styles/vendor.css?time=' + time,
                key: 'styles/vendor.css',
                execute: false
            }, {
                url: 'http://leinvaim.github.io/moviesowlionic/styles/style.css?time=' + time,
                key: 'styles/style.css',
                execute: false
            }];

            console.log('Files to load');
            console.log(files);

            basket.require.apply(null, files).then(function(stuff) {
                console.log('New files cached, about to reload');
                console.log('Templates:');
                console.log(basket.get('scripts/templates.js'));
                console.log('RELOAD FILES:');
                console.log(stuff);

                $scope.$broadcast('scroll.refreshComplete');
                console.log('FUUUCCCCCKKKK');
                reload();
            }, function() {
                console.log('Failed to get from Github!');
            });
        }

        // function doRefresh() {
        //     activate();
        // }
    }]);

'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('MoviesCtrl', ["$scope", "$http", "$rootScope", "$stateParams", "selectedMovieService", "$state", "$ionicLoading", "$ionicPopup", function($scope, $http, $rootScope, $stateParams, selectedMovieService, $state,
        $ionicLoading, $ionicPopup) {
        $scope.cinemaLocation = $stateParams.cinemaLocation;
        $scope.doRefresh = doRefresh;

        console.log($stateParams.cinemaLocation);
        $ionicLoading.show({
            template: '<ion-spinner class="bubbles"></ion-spinner>'
        });

        //start loading movies
        loadMovies();

        function loadMovies() {
            $http.get('http://api.moviesowl.com/v1/cinemas/' + $stateParams.cinemaId +
                '/movies').then(function(response) {
                $rootScope.movies = response.data.data; //I dont actually use this anymore

                $scope.groups = [
                    {
                        name: 'Great Movies',
                        style: 'balanced',
                        movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                            return movie.tomato_meter >= 70;
                        }), 2)
                    },
                    {
                        name: 'Fine Movies',
                        style: 'energized',
                        movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                            return movie.tomato_meter >= 50 && movie.tomato_meter < 70;
                        }), 2)
                    },
                    {
                        name: 'Bad Movies',
                        style: 'assertive',
                        movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                            return movie.tomato_meter < 50 && movie.tomato_meter >= 0;
                        }), 2)
                    },
                    {
                        name: 'No Rating Movies',
                        style: 'dark',
                        movies: _.chunk(_.filter($rootScope.movies, function(movie) {
                            return movie.tomato_meter < 0;
                        }), 2)
                    }
                ];

                $scope.hasNoMovies = false;
                if (response.data.data.length < 1) {
                    $scope.hasNoMovies = true;
                }
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            }, function() {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
                var alertPopup = $ionicPopup.alert({
                    title: 'Sorry :(',
                    template: 'Failed to load movies, /n Please try again!'
                });


            });
        }

        $scope.selectMovie = function(movie) {
            selectedMovieService.setMovie(movie);
            $state.go('movie', {
                movieId: movie.id
            });
        };

        function doRefresh() {
            console.log('Reloading Movies');
            loadMovies();
        }
    }]);

'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:MoviedetailsCtrl
 * @description
 * # MoviedetailsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('MovieDetailsCtrl', ["$scope", "$stateParams", "$http", "selectedMovieService", "showingsDataService", "$state", function($scope, $stateParams, $http, selectedMovieService, showingsDataService,
        $state) {
        // $scope.movie = _.find($rootScope.movies, function(movie) {
        //     return movie.id == $stateParams.movieId;
        // });
        $scope.movie = selectedMovieService.selectedMovie;
        $scope.showingsData = $scope.movie.showings.data;

        _.forEach($scope.showingsData, function(showing) {
            $http.get('http://api.moviesowl.com/v1/showings/' + showing.id).then(function(response) {
                var tempSeats = response.data;
                var seatsInfo = response.data.seats;
                var totalNumOfSeats = 0;
                var takenSeats = 0;
                for (var row = 0; row < seatsInfo.length; row++) {
                    for (var col = 0; col < seatsInfo[row].length; col++) {
                        if (seatsInfo[row][col] === 'available') {
                            totalNumOfSeats++;
                        }
                        if (seatsInfo[row][col] === 'taken') {
                            totalNumOfSeats++;
                            takenSeats += 1;
                        }
                    }
                }

                showing.totalNumOfSeats = totalNumOfSeats;
                showing.cinemaSize = getCinemaSize(totalNumOfSeats);
                showing.fullness = getFullness(totalNumOfSeats, takenSeats);
                showing.seats = seatsInfo;
                showingsDataService.setShowingsData($scope.showingsData);
            });
        });
        $scope.openSeatView = function(sessionId) {
            var seatsData = _.find($scope.showingsData, function(showing) {
                return showing.id === parseInt(sessionId);
            });

            if (seatsData.seats && seatsData.seats.length > 0) {
                console.log('am i here');
                $state.go('seats', {
                    showId: sessionId
                });
            }
        };

        function getCinemaSize(totalSeats) {
            console.log(totalSeats);
            if (totalSeats < 150) {
                return 'Small';
            } else if (totalSeats < 200) {
                return 'Medium';
            } else {
                return 'Large';
            }

        }

        function getFullness(totalSeats, takenSeats) {
            if (totalSeats === 0 && takenSeats === 0) {
                return 'not available';
            }

            var percentage = parseInt(takenSeats / totalSeats * 100);

            if (percentage > 80) {
                return 'Full';
            } else if (percentage > 30) {
                return 'Almost Full';
            } else {
                return percentage + '% Full';
            }
        }
    }]);

'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:ShowingsCtrl
 * @description
 * # ShowingsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
  .controller('ShowingsCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:SeatsCtrl
 * @description
 * # SeatsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('SeatsCtrl', ["$scope", "$http", "$stateParams", "showingsDataService", function($scope, $http, $stateParams, showingsDataService) {

        //$http.get('http://api.moviesowl.com/v1/showings/' + $stateParams.showId).then(function(response) {
        //  $http.get('http://api.moviesowl.com/v1/showings/141061').then(function(response) {

        $scope.doRefresh = doRefresh;

        var seatsData = _.find(showingsDataService.showingsData, function(showing) {
            return showing.id === parseInt($stateParams.showId);
        });
        console.log(seatsData);
        // var seatsData = response.data;
        $scope.seatingPlan = seatsData.seats;

        var numOfSeatInRow = $scope.seatingPlan[0].length;
        $scope.seatWidth = 100 / numOfSeatInRow;
        // console.log(seatsData);
        function doRefresh() {
            console.log('Reloading Seats');
            $http.get('http://api.moviesowl.com/v1/showings/' + $stateParams.showId).then(function(response) {
                $scope.seatingPlan = response.data.seats;
                $scope.$broadcast('scroll.refreshComplete');
            }, function() {
                $scope.$broadcast('scroll.refreshComplete');
            });

        }

    }]);

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

'use strict';

/**
 * @ngdoc service
 * @name moviesowlApp.selectedMovieService
 * @description
 * # selectedMovieService
 * Factory in the moviesowlApp.
 */
angular.module('moviesowlApp')
    .factory('selectedMovieService', function() {
        // Service logic
        // ...

        var service = {
            setMovie: setMovie,
            selectedMovie: {}
        };
        return service;


        function setMovie(movie) {
            console.log('set movie', movie);
            service.selectedMovie = movie;
        }
    });
