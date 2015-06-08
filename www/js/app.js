// Ionic Starter App

//angular.module('templates', []);
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var app = angular.module('cats', ['ionic', 'templates']);
//
//var app = angular.module('cats', ['ionic', 'templates']);
//
app.config(function ($stateProvider, $urlRouterProvider) {
    console.log('config running, adding routes!');
    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('home', {
            url: '/',
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
})
    .run(function ($ionicPlatform, $state, $templateCache, $q) {
//
        window.BOOTSTRAP_OK = true;
        console.log('bootstrap is OKAY');

        console.log($state);
//
//
        $ionicPlatform.ready(function () {
            console.log('device is now ready!');
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            //if (window.cordova && window.cordova.plugins.Keyboard) {
            //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //}
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }


            //// Check for Cordova
            //var isCordova = typeof cordova !== 'undefined',
            //// CordovaPromiseFS
            //    fs,
            //// CordovaFileLoader
            //    loader,
            //// script-tag...
            //    script,
            //// ...that contains the serverRoot
            //    serverRoot;
            //
            //// Get serverRoot from script tag.
            //script = document.querySelector('script[server]');
            //if(script) serverRoot= script.getAttribute('server');
            //if(!serverRoot) {
            //    throw new Error('Add a "server" attribute to the bootstrap.js script!');
            //}
            //
            //// Initialize filesystem and loader
            //fs = new CordovaPromiseFS({
            //    persistent: isCordova, // Chrome should use temporary storage.
            //    Promise: $q
            //});
            //
            //loader = new CordovaAppLoader({
            //    fs: fs,
            //    localRoot: 'app',
            //    serverRoot: serverRoot,
            //    mode: 'mirror',
            //    cacheBuster: true,
            //    checkTimeout: 120000
            //});
            //
            //// Check > Download > Update
            //function check(){
            //    //angular.element(document).ready(function() {
            //    //    angular.bootstrap(document, ['cats']);
            //    //});
            //    //
            //
            //    loader.check().then(function (updateAvailable) {
            //        console.log(updateAvailable);
            //        if (updateAvailable)
            //        {
            //            loader.download()
            //                .then(
            //                function (manifest)
            //                {
            //                    console.log(manifest);
            //                    loader.update();  // we can update the app
            //                },
            //                function (failedDownloadUrlArray)
            //                {
            //                    console.log(failedDownloadUrlArray);
            //                }
            //            )
            //        }
            //    });


                //loader.check()
                //    .then(function(){
                //        console.log('check done');
                //        return loader.download();
                //    })
                //    .then(function(){
                //        console.log('download done');
                //        return loader.update();
                //    },function(err){
                //        console.error('Auto-update error:',err);
                //    });

            //}
            //
            //
            //setTimeout(function() {
            //    check();
            //}, 10000)

            //
            //// Initialize a FileSystem
            //var fs = new CordovaPromiseFS({
            //    Promise: $q
            //});
            //
            //// Initialize a CordovaAppLoader
            //var loader = new CordovaAppLoader({
            //    fs: fs,
            //    serverRoot: 'http://craigmcnamara.com/test/',
            //    localRoot: 'app',
            //    cacheBuster: true, // make sure we're not downloading cached files.
            //    checkTimeout: 10000 // timeout for the "check" function - when you loose internet connection
            //});
            //
            //loader.check().then(function(updateAvailable) {
            //    debugger;
            //});

        });
    })


    .controller('MoviesCtrl', function ($scope, $http, $rootScope, $stateParams) {
        $scope.cinemaLocation = $stateParams.cinemaLocation;
        console.log($stateParams.cinemaLocation);
        // $http.get('http://api.moviesowl.com/v1/cinemas/12/movies?starting_after=1430870401').then(function(response) {
        $http.get('http://api.moviesowl.com/v1/cinemas/' + $stateParams.cinemaId + '/movies').then(function (response) {
            $rootScope.movies = response.data.data;
            $scope.movies = _.chunk($rootScope.movies, 2);
        });
    })
    .controller('MovieDetailsCtrl', function ($scope, $stateParams, $rootScope, $http) {
        $scope.movie = _.find($rootScope.movies, function (movie) {
            return movie.id == $stateParams.movieId;
        });
        var sessionIds = _.pluck($scope.movie.showings.data, 'id');
        console.log(sessionIds);
        $scope.sessionsInfo = [];

        _.forEach(sessionIds, function (sessionId) {
            $http.get('http://api.moviesowl.com/v1/showings/' + sessionId).then(function (response) {
                var tempSeats = response.data;
                var seatsInfo = response.data.seats;
                var totalNumOfSeats = tempSeats.seats_count;
                var takenSeats = 0;
                for (var row = 0; row < seatsInfo.length; row++) {
                    for (var col = 0; col < seatsInfo[row].length; col++) {
                        if (seatsInfo[row][col] === 'taken') {
                            takenSeats += 1;
                        }
                    }
                }
                tempSeats.totalNumOfSeats = totalNumOfSeats;
                tempSeats.cinemaSize = getCinemaSize(totalNumOfSeats);
                tempSeats.fullness = getFullness(totalNumOfSeats, takenSeats);
                $scope.sessionsInfo.push(tempSeats);
                console.log($scope.sessionsInfo);
            });
        });

        function getCinemaSize(totalSeats) {
            if (totalSeats > 200) {
                return 'Large';
            } else if (totalSeats > 150) {
                return 'Medium';
            } else {
                return 'Small';
            }

        }

        function getFullness(totalSeats, takenSeats) {
            var percentage = parseInt(takenSeats / totalSeats * 100);
            if (percentage > 80) {
                return 'Full';
            } else if (percentage > 30) {
                return 'Almost Full';
            } else {
                return percentage + '% Full';
            }
        }
    })
    .controller('ShowingsCtrl', function ($scope, $stateParams, $rootScope) {


    })
    .controller('CinemasCtrl', function ($scope, $http) {

        $http.get('http://api.moviesowl.com/v1/cinemas').then(function (response) {
            $scope.cinemas = response.data.data;
        });
    });


//angular.element(document).ready(function () {
//    console.log('Bootstrap app now!');
//    console.log(angular.element(document).find('body').html());
//    angular.bootstrap(document, ['cats']);
//});

//document.addEventListener('deviceready', onDeviceReady, false);
//function onDeviceReady() {
//
//}


