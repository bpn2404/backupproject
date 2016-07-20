'use strict';

app.factory('commonService', function ($http, $location, $rootScope) {

    
    function sortDifferenceAscending(a, b) {

        return a.diffToCurrent - b.diffToCurrent;
    };
    
    return {

        
        //Calls the api to get the game id from the g_register_game table, there shold ever be only one record   
        getRegisterScreenGameId: function (callback) {

            $http.get('api/registeredGameId/').success(function (msg) {

                callback(msg);
            });

        },
        
        
         //Gets a single game by id 
        getGameById: function (gameId, callback) {

            $http.get('api/game/' + gameId).success(function (msg) {

                callback(msg);
            });

        },
        
        
         updateState: function (state, callback) {

            var data = {state: state};
              
            
            $http.put('api/updateSplashState/' + 1, data).success(function (msg) {
                console.log("UPDATE GAME STATE " + state);
                callback(msg);
            });
        },
        
        
        
    };


});