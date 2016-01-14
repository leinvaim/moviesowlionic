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
                                      $timeout, craigalytics) {

        $scope.doRefresh = doRefresh;
        $scope.movie = selectedMovieService.selectedMovie;
        $scope.buyTickets = buyTickets;
        $scope.buyTelstraTickets = buyTelstraTickets;

        $scope.$on('$ionicView.afterEnter', function(){
            activate();
        });

        function activate() {
            console.log($scope.movie);
            craigalytics.send('VIEWED_SEATING', {
                name: $scope.movie.title
            });

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
            craigalytics.send('BOUGHT_TICKET', {
                name: $scope.movie.title
            });

            var url = $scope.session.tickets_url;
            url = url.replace('&bookingSource=www|sessions', '');
            var ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
            ref.addEventListener('loadstop', function() {
                console.log('load stop reached');
                //ref.executeScript({code: "$('.continue').click(function() { $('#MemberCards').val('800012851988'); });"});
                ref.executeScript({code: "$('#MemberCards').val('800012851988');"});
            });
        }

        function buyTelstraTickets() {
            craigalytics.send('BOUGHT_TELSTRA_TICKET', {
                name: $scope.movie.title
            });
            var url = 'https://www.my.telstra.com.au/myaccount/home?goto=https%3A%2F%2Fwww.my.telstra.com.au%2Fmyaccount%2Floyalty-offers-consumer';
            window.open(url, '_blank');
        }
    });
