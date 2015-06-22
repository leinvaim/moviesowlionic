angular.module('moviesowlApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/cinemas.html',
    "<ion-view view-title=\"Cinemas\"><!-- if you dont put ion content, the first ion item will be hidden under ion-navbar\n" +
    " \t--><div>{{ uuid }}</div><ion-content><!--  <ion-refresher\n" +
    "                pulling-text=\"Pull to update app...\"\n" +
    "                on-refresh=\"doRefresh()\">\n" +
    "        </ion-refresher> --><ion-list><ion-item ng-repeat=\"cinema in cinemas\" href=\"#/movies/{{cinema.id}}/?cinemaLocation={{cinema.location}}\">{{cinema.location}}</ion-item></ion-list><button class=\"button button-full button-balanced\" ng-click=\"reset()\">Reset</button> <button class=\"button button-full button-balanced\" ng-click=\"update()\">Update</button></ion-content></ion-view>"
  );


  $templateCache.put('templates/movie-group.html',
    "<div class=\"group\" ng-if=\"group.movies.length > 0\"><div class=\"item item-divider {{ group.style }}-bg\" ion-affix data-affix-within-parent-with-class=\"group\" style=\"border-bottom: none; color:white; text-align:center\">{{ group.name }}<!--<div class=\"badge badge-light\">2</div>--></div><div class=\"row\" ng-repeat=\"row in group.movies\"><div class=\"col col-50\" ng-repeat=\"movie in row\"><div style=\"width:100%; height:100%; background-color:white\" ng-click=\"selectMovie(movie)\"><!-- <a href=\"#/movie/{{movie.id}}\"> --><img ng-src=\"{{movie.poster}}\" style=\"width:100%\"> <span am-time-ago=\"{{movie.showings.data[0].start_time}}\" am-preprocess=\"unix\"></span><!--  </a> --></div></div></div></div>"
  );


  $templateCache.put('templates/movieDetails.html',
    "<ion-view view-title=\"{{movie.title}}\"><ion-content><div class=\"row\"><div class=\"col\"><img src=\"{{movie.poster}}\" style=\"max-height:100%; max-width:100%\"></div><div class=\"col\"><div class=\"row\">{{movie.title}}</div><div class=\"row\">Run Time: {{movie.run_time}}</div><div class=\"row\">Director:<br>{{movie.director}}</div><div class=\"row wrap\">Casts:<br>{{movie.cast}}</div></div></div><ion-list><ion-item class=\"wrap\"><div>Rotten Tomatoes</div><img src=\"images/{{rottenLogo}}\" style=\"width:25px\"> {{movie.tomato_meter}}%</ion-item><ion-item class=\"wrap\">Synopsis<br>{{movie.synopsis}}</ion-item><ion-item ng-repeat=\"session in showingsData\" ng-click=\"openSeatView(session.id)\" style=\"padding:5px\"><div class=\"row\"><div class=\"col col-25\" style=\"text-align:left\">{{session.start_time*1000| date:'h:mma' }}</div><div class=\"col col-35\" ng-show=\"session.screen_type === 'standard'\"><span ng-show=\"session.showing_type ==='3D'\" style=\"color:red; font-weight:bold\">3D</span> {{session.cinemaSize}}</div><div class=\"col col-35\" ng-hide=\"session.screen_type === 'standard'\"><span ng-show=\"session.showing_type ==='3D'\" style=\"color:red; font-weight:bold\">3D</span> <span ng-show=\"session.screen_type ==='gold class'\" style=\"color:goldenrod; font-weight:bold\">Gold Class</span> <span ng-show=\"session.screen_type ==='vmax'\" style=\"color:blue; font-weight:bold\">VMAX</span></div><div class=\"col col-40\" style=\"text-align:right\" ng-show=\"session.fullness.length > 0\">{{session.fullness}}</div><div class=\"col col-40\" style=\"text-align:right\" ng-hide=\"session.fullness.length > 0\"><div class=\"custom-spinner\"><div class=\"dot1\"></div><div class=\"dot2\"></div></div></div></div></ion-item></ion-list></ion-content></ion-view>"
  );


  $templateCache.put('templates/movies.html',
    "<ion-view view-title=\"{{cinemaLocation}}\"><ion-content><!-- Refresher --><ion-refresher pulling-text=\"Pull to update movies.\" on-refresh=\"doRefresh()\" spinner=\"bubbles\"></ion-refresher><!-- /Refresher --><div ng-hide=\"hasNoMovies\"><div ng-repeat=\"group in groups\"><ng-include src=\"'templates/movie-group.html'\"></ng-include></div></div><div ng-if=\"hasNoMovies\">No more movies available today. Come back tomorrow :)</div></ion-content></ion-view>"
  );


  $templateCache.put('templates/seats.html',
    "<ion-view view-title=\"View Seats\"><ion-content><ion-refresher pulling-text=\"Pull to update seats view.\" on-refresh=\"doRefresh()\" spinner=\"bubbles\"></ion-refresher><div style=\"text-align: center\"><div style=\"margin:20px 5%; padding:1%; background-color:black; color:white\"><strong class=\"blink_me\">SCREEN</strong></div><div ng-repeat=\"row in seatingPlan track by $index\" style=\"padding-left:1%\"><div ng-repeat=\"seat in row track by $index\" style=\"position:relative;float: left; width:{{seatWidth}}%; padding-bottom:{{seatWidth}}%\"><div ng-show=\"seat === 'available'\" style=\"position:absolute; background-color:blue; top:10%; bottom:2%; right:10%; left:0\"></div><div ng-show=\"seat === 'taken'\" style=\"position:absolute; line-height:100%; color:red; top:10% ;bottom:0 ;right:10% ;left:0; border: 1px solid\"><img src=\"images/seat-taken.png\" style=\"display:block; max-width: 100%\"></div></div></div></div></ion-content></ion-view>"
  );


  $templateCache.put('templates/showings.html',
    "<ion-view view-title=\"showings\"><ion-content><ion-list><ion-item ng-repeat=\"item in items\">Hello, {{item}}!</ion-item></ion-list></ion-content></ion-view>"
  );

}]);
