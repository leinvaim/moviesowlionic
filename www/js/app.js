// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('moviesowlApp', [
    'ionic',
    'config',
    'templates',
    'angularMoment',
    'ion-affix',
    'ngAnimate'])

    .run(function ($ionicPlatform,
                   ENV,
                   $rootScope,
                   autoupdate,
                   $ionicPopup,
                   $http,
                   craigalytics) {

        // Check for updates
        autoupdate.bootstrapOk();

        // Globals
        $rootScope.ENV = ENV;

        $ionicPlatform.ready(function () {
            if (window.cordova) {
                // Add in app browser open
                window.open = cordova.InAppBrowser.open;
                // Register app for craigalytics
                craigalytics.register();
            }
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
            if (navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            if(window.PushNotification) {
                var push = PushNotification.init({
                    "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

                push.on('registration', function(data) {
                    // data.registrationId
                    console.log('PN:', data);
                    $http.post(ENV.apiEndpoint + 'devices', {
                        'device_type': window.device.platform,
                        'token': data.registrationId
                    });
                });

                push.on('notification', function(data) {
                    craigalytics.send('OPENED_APP_AFTER_PUSH_NOTIFICATION', {
                        title: data.title,
                        message: data.message
                    });
                    // data.message,
                    // data.title,
                    // data.count,
                    // data.sound,
                    // data.image,
                    // data.additionalData
                    //console.log(data);
                    //window.alert(data);
                    //var alertPopup = $ionicPopup.alert({
                    //    title: data.title,
                    //    template: data.message
                    //});
                });

                push.on('error', function(e) {
                    // e.message
                    console.log('PN error', e);
                });
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('movies', {
                parent: 'tab',
                url: '/movies',
                views: {
                    'tab-movies': {
                        templateUrl: 'templates/tab-movies.html',
                        controller: 'MoviesController'
                    }
                }
            })
            .state('cities', {
                parent: 'tab',
                url: '/cities',
                views: {
                    'tab-movies': {
                        templateUrl: 'templates/cities.html',
                        controller: 'CitiesController'
                    }
                }
            })
            .state('cinemas', {
                parent: 'tab',
                url: '/cinemas?city',
                views: {
                    'tab-movies': {
                        templateUrl: 'templates/cinemas-page.html',
                        controller: 'CinemasController'
                    }
                }
            })
            .state('showings', {
                parent: 'tab',
                url: '/movies/:movieId',
                views: {
                    'tab-movies': {
                        templateUrl: 'templates/showings.html',
                        controller: 'ShowingsCtrl'
                    }
                }
            })
            .state('seats', {
                parent: 'tab',
                url: '/seats/:showId',
                views: {
                    'tab-movies': {
                        templateUrl: 'templates/seats.html',
                        controller: 'SeatsCtrl'
                    }
                }
            })

            .state('tab.news', {
                url: '/news',
                views: {
                    'tab-news': {
                        templateUrl: 'templates/tab-news.html',
                        controller: 'NewsController'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountController'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/movies');

    });

setTimeout(function() {
    angular.element(document).ready(function() {
        console.log('bootstrapping now');
        angular.bootstrap(document, ['moviesowlApp']);
    });
}, 0);