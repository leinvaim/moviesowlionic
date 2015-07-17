angular.module('moviesowlApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/cinemas.html',
    "<ion-modal-view><ion-header-bar><h1 class=\"title\">Cinemas</h1><button class=\"button button-outline button-dark\" ng-click=\"closeModalOnly()\">Done</button></ion-header-bar><ion-content><label ng-repeat=\"cinema in cinemas\" class=\"item item-radio item-icon-right\" ng-click=\"closeModal(cinema)\"><input type=\"radio\" name=\"group\"><div class=\"item-content\"><span>{{cinema.location}}</span> <span ng-show=\"cinemaLocation === cinema.location\"><i class=\"icon ion-ios-heart icon-accessory\" style=\"color:deeppink; font-size:30px; width:60px\"></i></span> <span ng-hide=\"cinemaLocation === cinema.location\"><i class=\"icon ion-ios-heart-outline icon-accessory\" style=\"font-size: 30px; width:60px\"></i></span></div></label></ion-content></ion-modal-view>"
  );


  $templateCache.put('templates/movie-group.html',
    "<div class=\"group\" ng-if=\"group.movies.length > 0\"><div class=\"item item-divider {{ group.style }}-bg\" ion-affix data-affix-within-parent-with-class=\"group\" style=\"border: none; color:white; text-align:center\">{{ group.name }}<!--<div class=\"badge badge-light\">2</div>--></div><div ng-repeat=\"row in group.movies\" ng-if=\"mode == 'list'\"><div class=\"item item-dark item-icon-right\" ng-repeat=\"movie in row\" style=\"background-color:#222\" ng-click=\"selectMovie(movie)\"><h2 style=\"color:white\">{{ movie.title }}</h2><p><span am-time-ago=\"{{movie.showings.data[0].start_time}}\" am-preprocess=\"unix\"></span></p><i class=\"icon ion-chevron-right icon-accessory\"></i></div></div><div ng-repeat=\"row in group.movies\" class=\"row\" ng-if=\"mode == 'grid'\"><div class=\"col col-50\" ng-repeat=\"movie in row\" style=\"position:relative\"><div style=\"width:100%; height:100%\" ng-click=\"selectMovie(movie)\"><!-- <a href=\"#/movie/{{movie.id}}\"> --><img ng-src=\"{{movie.poster}}\" style=\"width:100%\"><div style=\"position: absolute;bottom:30px;width:100%;text-align:center\"><span am-time-ago=\"{{movie.showings.data[0].start_time}}\" am-preprocess=\"unix\" style=\"background-color: #333;color:#eee;padding:2px 10px;border-radius:100px;\"></span></div></div></div></div></div>"
  );


  $templateCache.put('templates/movieDetails.html',
    "<!--  --><ion-modal-view><img src=\"{{ movie.poster }}\" class=\"background-image-two\"><ion-header-bar class=\"detailsTitle\"><div class=\"title\" style=\"font-weight:bold\">{{movie.title}}</div><!--         <button class=\"button button-outline button-dark\" ng-click=\"closeModalOnly()\">Done</button> --></ion-header-bar><ion-content><div></div><div class=\"list\"><div class=\"item container-details\"><div class=\"item-divider movieDetailsHeading\">Run Time</div><div class=\"movieDetails\">{{movie.run_time}} Minutes</div></div><div class=\"item container-details\"><div class=\"item-divider movieDetailsHeading\">Directors</div><div class=\"wrap movieDetails\">{{movie.director}}</div></div><div class=\"item container-details\"><div class=\"item-divider movieDetailsHeading\">Casts</div><div class=\"wrap movieDetails\">{{movie.cast}}</div></div><div class=\"item container-details\"><div class=\"item-divider movieDetailsHeading\">Synopsis</div><div class=\"wrap movieDetails\">{{movie.synopsis}}</div></div></div><button class=\"button button-full button-dark\" ng-click=\"closeModal()\">Close</button></ion-content></ion-modal-view>"
  );


  $templateCache.put('templates/movies.html',
    "<ion-view style=\"background-color: #222\">><ion-nav-title>{{cinemaLocation}}</ion-nav-title><ion-nav-buttons side=\"primary\"><button class=\"button\" ng-click=\"toggleViewMode()\"><i class=\"icon ion-grid\" ng-show=\"mode == 'list'\"></i> <i class=\"icon ion-ios-list-outline\" ng-show=\"mode == 'grid'\"></i></button></ion-nav-buttons><ion-nav-buttons side=\"secondary\"><button class=\"button\" ng-click=\"openModal()\">Cinemas</button></ion-nav-buttons><ion-content style=\"background-color: #222\"><!-- Refresher --><ion-refresher pulling-text=\"Pull to update movies.\" on-refresh=\"doRefresh()\" spinner=\"bubbles\"></ion-refresher><!-- /Refresher --><div ng-hide=\"hasNoMovies\"><div ng-repeat=\"group in groups\"><ng-include src=\"'templates/movie-group.html'\"></ng-include></div></div><div class=\"item\" ng-if=\"hasNoMovies\" style=\"text-align: center\"><h2>No more movies today</h2><p style=\"margin-bottom: 10px\">Come back tomorrow</p><img src=\"images/no-movies-owl.png\" alt=\"\" style=\"max-width: 50%\"></div></ion-content><ion-footer-bar align-title=\"left\" class=\"bar-dark item-icon-right\" ng-click=\"showTimesModal()\"><!--<div class=\"buttons\">--><!--<button class=\"button\">Left Button</button>--><!--</div>--><h1 class=\"title\"><i class=\"ion-android-time\"></i> {{ startingAfter | date:'shortTime'}}</h1><i class=\"icon ion-chevron-right icon-accessory\"></i><!--<div class=\"buttons\" ng-click=\"doSomething()\">--><!--<button class=\"button\">Right Button</button>--><!--</div>--></ion-footer-bar></ion-view>"
  );


  $templateCache.put('templates/seats.html',
    "<ion-view view-title=\"{{movie.title}}\" style=\"background-color: #222\"><!--<img src=\"{{ movie.poster }}\" class=\"background-image-two\">--><ion-content><ion-refresher pulling-text=\"Pull to update seats view.\" on-refresh=\"doRefresh()\" spinner=\"bubbles\"></ion-refresher><div style=\"text-align: center; font-size:1.2em; color: white\" class=\"padding\">Session Time: {{session.start_time*1000| date:'h:mma' }}</div><div style=\"text-align: center\" class=\"padding\"><div style=\"margin:20px 5%; padding:1%; background-color:white; color:#333\"><strong class=\"blink_me\">SCREEN</strong></div><div style=\"text-align: center\" ng-hide=\"seatingPlan\"><ion-spinner></ion-spinner></div><div ng-repeat=\"row in seatingPlan track by $index\" style=\"padding-left:1%\"><div ng-repeat=\"seat in row track by $index\" style=\"position:relative;float: left; width:{{seatWidth}}%; padding-bottom:{{seatWidth}}%\"><div ng-show=\"seat === 'available'\" class=\"emptySeat\" style=\"top:10%; bottom:2%; right:10%; left:0\"></div><div ng-show=\"seat === 'taken'\" class=\"filledSeat\" style=\"line-height:100%; top:10% ;bottom:0 ;right:10% ;left:0\"><img src=\"images/seat-taken.png\" style=\"display:block; max-width: 100%\"></div></div></div></div></ion-content></ion-view>"
  );


  $templateCache.put('templates/showings.html',
    "<ion-view style=\"background-color: #222\"><!-- <div class=\"background-image\" style=\"background-image: url('{{movie.poster}}');\">\n" +
    "    </div> --><ion-nav-title>{{movie.title}}</ion-nav-title><!--<img src=\"{{ movie.poster }}\" class=\"background-image-two\">--><ion-content><!--<div class=\"content\">--><!--  <div class=\"row\">\n" +
    "                <div class=\"col\">\n" +
    "                    <img src=\"{{movie.poster}}\" style=\"max-height:100%; max-width:100%;\">\n" +
    "                </div>\n" +
    "                <div class=\"col\">\n" +
    "                    <div class=\"row\">\n" +
    "                        {{movie.title}}\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        Run Time: {{movie.run_time}}\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        Director:\n" +
    "                        <br/> {{movie.director}}\n" +
    "                    </div>\n" +
    "                    <div class=\"row wrap\">\n" +
    "                        Casts:\n" +
    "                        <br/> {{movie.cast}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div> --><ion-list><ion-item class=\"ratingCell\" ng-if=\"movie.tomato_meter >= 0\"><div>Rotten Tomatoes</div><img src=\"{{rottenLogo}}\" style=\"width:25px;position:relative;top:6px\"> {{movie.tomato_meter}}%</ion-item><ion-item class=\"item-dark item-icon-right\" ng-click=\"openModal()\" style=\"background-color: #222\"><!--{{ movie.synopsis }}-->More Info <i class=\"icon ion-chevron-right icon-accessory\"></i></ion-item><div class=\"item item-dark item-divider\">Today's Sessions</div><ion-item ng-repeat=\"session in showingsData\" ng-click=\"openSeatView(session.id)\" class=\"item-dark item-icon-right\" style=\"background-color: #222\"><div class=\"row\" style=\"padding: 0\"><div class=\"col col-25\" style=\"padding:0;text-align:left; font-weight:bold\">{{session.start_time*1000| date:'h:mma' }}</div><div class=\"col col-35\" ng-show=\"session.screen_type === 'standard'\" style=\"padding:0\"><span ng-show=\"session.showing_type ==='3D'\" style=\"color:red; font-weight:bold\">3D</span> {{session.cinemaSize}}</div><div class=\"col col-35\" ng-hide=\"session.screen_type === 'standard'\" style=\"padding:0\"><span ng-show=\"session.showing_type ==='3D'\" style=\"color:red; font-weight:bold\">3D</span> <span ng-show=\"session.screen_type ==='gold class'\" style=\"color:rgb(255, 237, 54); font-weight:bold; padding:0\">Gold Class</span> <span ng-show=\"session.screen_type ==='vmax'\" style=\"color:rgb(68, 156, 255); font-weight:bold; padding:0\">VMAX</span></div><div class=\"col col-40\" style=\"text-align:right; padding:0\" ng-show=\"session.fullness.length > 0\">{{session.fullness}}</div><div class=\"col col-40\" style=\"text-align:right; padding:0\" ng-hide=\"session.fullness.length > 0\"><ion-spinner></ion-spinner></div></div><i class=\"icon ion-chevron-right icon-accessory\"></i></ion-item></ion-list><!--</div>--></ion-content></ion-view>"
  );


  $templateCache.put('templates/times.html',
    "<ion-modal-view><ion-header-bar><h1 class=\"title\">Starting After</h1><button class=\"button button-outline button-dark\" ng-click=\"timesModal.hide();\">Done</button></ion-header-bar><ion-content><ion-item ng-repeat=\"time in times\" ng-click=\"setStartingTime(time)\">{{ time | date:'shortTime' }}</ion-item><!--<label ng-repeat=\"cinema in cinemas\" class=\"item item-radio item-icon-right\" ng-click=\"closeModal(cinema)\">--><!--<input type=\"radio\" name=\"group\">--><!--<div class=\"item-content\">--><!--<span>{{cinema.location}}</span>--><!--<span ng-show=\"cinemaLocation === cinema.location\">--><!--<i class=\"icon ion-ios-heart icon-accessory\" style=\"color:deeppink; font-size:30px; width:60px;\"></i> --><!--</span>--><!--<span ng-hide=\"cinemaLocation === cinema.location\">--><!--<i class=\"icon ion-ios-heart-outline icon-accessory\" style=\"font-size: 30px; width:60px;\"></i>--><!--</span>--><!--</div>--><!--</label>--></ion-content></ion-modal-view>"
  );

}]);
