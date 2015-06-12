angular.module('templates')

.controller('SeatsCtrl', function($scope, $http, $stateParams) {

    $http.get('http://api.moviesowl.com/v1/showings/' + $stateParams.showId).then(function(response) {
    //	$http.get('http://api.moviesowl.com/v1/showings/141061').then(function(response) {
       var seatsData = response.data;
       $scope.seatingPlan = seatsData.seats;
       var numOfSeatInRow = $scope.seatingPlan[0].length;
       $scope.seatWidth = 100/numOfSeatInRow;
       console.log(seatsData);

    });
});
