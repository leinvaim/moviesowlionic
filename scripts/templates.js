angular.module('moviesowlApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/cinemas.html',
    "<ion-view view-title=\"Cinemas\"><!-- if you dont put ion content, the first ion item will be hidden under ion-navbar\n" +
    " \t--><ion-content><ion-refresher pulling-text=\"Pull to update app...\" on-refresh=\"doRefresh()\"></ion-refresher><ion-list><ion-item ng-repeat=\"cinema in cinemas\" href=\"#/movies/{{cinema.id}}/?cinemaLocation={{cinema.location}}\">{{cinema.location}}</ion-item></ion-list><button class=\"button button-full button-balanced\" ng-click=\"reset()\">Reset</button> <button class=\"button button-full button-balanced\" ng-click=\"update()\">Update</button><div>{{ uuid }}</div></ion-content></ion-view>"
  );


  $templateCache.put('templates/movieDetails.html',
    "<ion-view view-title=\"{{movie.title}}\"><ion-content><div class=\"row\"><div class=\"col\"><img src=\"{{movie.poster}}\" style=\"max-height:100%; max-width:100%\"></div><div class=\"col\"><div class=\"row\">{{movie.title}}</div><div class=\"row\">Rotten Tomatoes: {{movie.tomato_meter}}</div><div class=\"row\">Run Time: {{movie.run_time}}</div><div class=\"row\">Director:<br>{{movie.director}}</div><div class=\"row wrap\">Casts:<br>{{movie.cast}}</div></div></div><ion-list><ion-item class=\"wrap\">Synopsis<br>{{movie.synopsis}}</ion-item><ion-item ng-repeat=\"session in showingsData\" ng-click=\"openSeatView(session.id)\" style=\"padding:5px\"><div class=\"row\"><div class=\"col col-25\" style=\"text-align:left\">{{session.start_time*1000| date:'h:mma' }}</div><div class=\"col col-35\" ng-show=\"session.screen_type === 'standard'\"><span ng-show=\"session.showing_type ==='3D'\" style=\"color:red; font-weight:600\">3D</span> {{session.cinemaSize}}</div><div class=\"col col-35\" ng-hide=\"session.screen_type === 'standard'\"><span ng-show=\"session.showing_type ==='3D'\" style=\"color:red; font-weight:600\">3D</span> <span ng-show=\"session.screen_type ==='gold class'\" style=\"color:goldenrod; font-weight:600\">Gold Class</span> <span ng-show=\"session.screen_type ==='vmax'\" style=\"color:blue; font-weight:600\">VMAX</span></div><div class=\"col col-40\" style=\"text-align:right\">{{session.fullness}}</div></div></ion-item></ion-list></ion-content></ion-view>"
  );


  $templateCache.put('templates/movies.html',
    "<ion-view view-title=\"{{cinemaLocation}}\"><ion-content><ion-refresher pulling-text=\"Pull to update movies.\" on-refresh=\"doRefresh()\" spinner=\"bubbles\"></ion-refresher><div class=\"row\" ng-repeat=\"row in movies\" ng-hide=\"hasNoMovies\"><div class=\"col col-50\" ng-repeat=\"movie in row\"><div style=\"width:100%; height:100%; background-color:white\" ng-click=\"selectMovie(movie)\"><!-- <a href=\"#/movie/{{movie.id}}\"> --><img ng-src=\"{{movie.poster}}\" style=\"width:100%\"><div>{{movie.tomato_meter}}</div><!--  </a> --></div></div></div><div ng-show=\"hasNoMovies\">No more movies available today. Come back tomorrow :)</div></ion-content></ion-view>"
  );


  $templateCache.put('templates/seats.html',
    "<ion-view view-title=\"View Seats\"><ion-content><ion-refresher pulling-text=\"Pull to update seats view.\" on-refresh=\"doRefresh()\" spinner=\"bubbles\"></ion-refresher><div style=\"text-align: center\"><div style=\"margin:20px 5%; padding:1%; background-color:black; color:white\"><strong class=\"blink_me\">SCREEN</strong></div><div ng-repeat=\"row in seatingPlan track by $index\" style=\"padding-left:1%\"><div ng-repeat=\"seat in row track by $index\" style=\"position:relative;float: left; width:{{seatWidth}}%; padding-bottom:{{seatWidth}}%\"><div ng-show=\"seat === 'available'\" style=\"position:absolute; background-color:blue; top:10%; bottom:2%; right:10%; left:0\"></div><div ng-show=\"seat === 'taken'\" style=\"position:absolute; line-height:100%; color:red; top:10% ;bottom:0 ;right:10% ;left:0; border: 1px solid\"><img src=\"images/seat-taken.png\" style=\"display:block; max-width: 100%\"></div></div></div></div></ion-content></ion-view>"
  );


  $templateCache.put('templates/showings.html',
    "<ion-view view-title=\"showings\"><ion-content><ion-list><ion-item ng-repeat=\"item in items\">Hello, {{item}}!</ion-item></ion-list></ion-content></ion-view>"
  );

}]);
