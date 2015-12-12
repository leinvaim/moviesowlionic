'use strict';

/**
 * @ngdoc function
 * @name moviesowlApp.controller:SeatsCtrl
 * @description
 * # SeatsCtrl
 * Controller of the moviesowlApp
 */
angular.module('moviesowlApp')
    .controller('SeatsCtrl', function(ENV, $scope, $http, $stateParams, showingsDataService, selectedMovieService,
                                      $timeout) {

        //$http.get('http://api.moviesowl.com/v1/showings/' + $stateParams.showId).then(function(response) {
        //  $http.get('http://api.moviesowl.com/v1/showings/141061').then(function(response) {

        $scope.doRefresh = doRefresh;
        $scope.movie = selectedMovieService.selectedMovie;
        $scope.buyTickets = buyTickets;
        $scope.buyTelstraTickets = buyTelstraTickets;

        $scope.$on('$ionicView.afterEnter', function(){
            activate();
        });

        function activate() {
            console.log($scope.movie);

            var seatsData = _.find(showingsDataService.showingsData, function(showing) {
                return showing.id === parseInt($stateParams.showId);
            });
            $scope.session = seatsData;
            console.log(seatsData);
            $timeout(function() {
                getSeatingPlan(seatsData);
            }, 1000);
        }


        function getSeatingPlan(seatsData) {
            $scope.seatingPlan = seatsData.seats;
            var numOfSeatInRow = $scope.seatingPlan[0].length;
            $scope.seatWidth = 100 / numOfSeatInRow;
        }



        // console.log(seatsData);
        function doRefresh() {
            console.log('Reloading Seats');
            $http.get(ENV.apiEndpoint + 'showings/' + $stateParams.showId).then(function(response) {
                $scope.seatingPlan = response.data.seats;
                $scope.$broadcast('scroll.refreshComplete');
            }, function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function buyTickets() {

            var url = $scope.session.tickets_url;
            console.log(url);
            //cordova.InAppBrowser.open(url, '_blank', 'location=yes');
            window.open(url, '_system');
        }

        function buyTelstraTickets() {
            var url = 'https://www.my.telstra.com.au/myaccount/home?goto=https%3A%2F%2Fwww.my.telstra.com.au%2Fmyaccount%2Floyalty-offers-consumer';
            window.open(url, '_system');
        }
    });
