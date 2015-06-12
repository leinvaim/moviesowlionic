angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("templates/cinemas.html","<ion-view view-title=\"Cinemas\">\n    <!-- if you dont put ion content, the first ion item will be hidden under ion-navbar\n 	-->\n\n    <ion-content>\n        <ion-refresher\n                pulling-text=\"Pull to update app...\"\n                on-refresh=\"doRefresh()\">\n        </ion-refresher>\n\n        <ion-list>\n            <ion-item ng-repeat=\"cinema in cinemas\" href=\"#/movies/{{cinema.id}}/?cinemaLocation={{cinema.location}}\">\n                {{cinema.location}}\n            </ion-item>\n        </ion-list>\n\n    </ion-content>\n</ion-view>\n");
$templateCache.put("templates/movieDetails.html","<ion-view view-title=\"{{movie.title}}\">\n    <ion-content>\n        <div class=\"row\">\n            <div class=\"col\">\n                <img src=\"{{movie.poster}}\" style=\"height:250px; width:auto;\">\n            </div>\n            <div class=\"col\">\n                <div class=\"row\">\n                    {{movie.title}}\n                </div>\n                <div class=\"row\">\n                    Rotten Tomatoes: {{movie.tomato_meter}}\n                </div>\n                <div class=\"row\">\n                    Run Time: {{movie.run_time}}\n                </div>\n                <div class=\"row\">\n                    Director:\n                    <br/> {{movie.director}}\n                </div>\n                <div class=\"row wrap\">\n                    Casts:\n                    <br/> {{movie.cast}}\n                </div>\n            </div>\n        </div>\n        <ion-list>\n            <ion-item class=\"wrap\">\n                Synopsis\n                <br/>{{movie.synopsis}}\n            </ion-item>\n\n            <ion-item ng-repeat=\"session in sessionsInfo\" href=\"#/seats/{{session.id}}\">\n                <div class=\"row\" >\n                    <div class=\"col col-20\" style=\"text-align:left;\">{{session.start_time*1000| date:\'h:mma\' }}</div>\n                    <div class=\"col col-40\" ng-show=\"session.screen_type === \'standard\'\">\n                        <span ng-show=\"session.showing_type ===\'3D\'\">\n                            3D\n                        </span> {{session.cinemaSize}}\n                    </div>\n                    <div class=\"col col-40\" ng-hide=\"session.screen_type === \'standard\'\">\n                        <span ng-show=\"session.showing_type ===\'3D\'\">\n                            3D\n                        </span>\n                        <span ng-show=\"session.screen_type ===\'gold class\'\">\n                            Gold Class\n                        </span>\n                        <span ng-show=\"session.screen_type ===\'vmax\'\">\n                            VMAX\n                        </span>\n                    </div>\n                    <div class=\"col col-40\" style=\"text-align:right;\">\n                        {{session.fullness}}\n                    </div>\n                </div>\n            </ion-item>\n        </ion-list>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("templates/movies.html","<ion-view view-title=\"{{cinemaLocation}}\">\n    <ion-content>\n        <div class=\"row\" ng-repeat=\"row in movies\">\n            <div class=\"col col-50\" ng-repeat=\"movie in row\" >\n              <div style=\"max-width:100%; max-height:100%; background-color:white;\">\n                <a href=\"#/movie/{{movie.id}}\">\n                    <img ng-src=\"{{movie.poster}}\" style=\"width:100%;\">\n                </a>\n              </div>\n                \n            </div>\n        </div>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("templates/seats.html","<ion-view view-title=\"View Seats\">\n    <ion-content>\n        <div style=\"text-align: center;\">\n            <div style=\"margin:20px 5%; padding:1%; background-color:black; color:white;\">\n                <strong class=\"blink_me\">SCREEN</strong>\n            </div>\n            <div ng-repeat=\"row in seatingPlan track by $index\" style=\"padding-left:1%\">\n                <div ng-repeat=\"seat in row track by $index\" style=\"position:relative;float: left; width:{{seatWidth}}%; padding-bottom:{{seatWidth}}%;\">\n                    <div ng-show=\"seat === \'available\'\" style=\"position:absolute; background-color:blue; top:10%; bottom:0; right:10%; left:0;\"></div>\n                    <div ng-show=\"seat === \'taken\'\" style=\"position:absolute; line-height:100%; color:red; top:10% ;bottom:0 ;right:10% ;left:0; border: 1px solid;\">\n                    	<img src=\"img/seat-taken.png\" style=\"display:block; max-width: 100%;\">\n                	</div>\n                </div>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("templates/showings.html","<ion-view view-title=\"showings\">\n    <ion-content>\n        <ion-list>\n            <ion-item ng-repeat=\"item in items\">\n                Hello, {{item}}!\n            </ion-item>\n        </ion-list>\n    </ion-content>\n</ion-view>\n");}]);