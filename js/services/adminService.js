'use strict';

app.factory('adminService', function ($http, $location, $rootScope) {

    
    function sortDifferenceAscending(a, b) {

        return a.diffToCurrent - b.diffToCurrent;
    };
    
    return {

        //Gets the games in the future for the register screen        
        getRegisterScreenGames: function (callback) {

            var current = moment(new Date());
            var gamesInFuture = [];

            $http.get('api/app/games/').success(function (msg) {

                //First find only games in the future
                angular.forEach(msg, function (result) {

                    var resultDate = moment(result.date);

                    result.diffToCurrent = moment(resultDate).diff(moment(current));

                    if (result.diffToCurrent >= 0) {

                        gamesInFuture.push(result);
                    }

                });

                gamesInFuture.sort(sortDifferenceAscending); // Sort so that the closest game to current date and time is at index 0

                callback(gamesInFuture);
            });

        },
                    
        
        setGameOnRegister: function (gameId, callback) {

             var data = {game_id: gameId};
            
            $http.post('api/app/setRegisterScreenGame', data).success(function (msg) {
                
                callback(msg);
            });

        },
        
        updateGameOnRegister: function (gameId, tableObjId, callback) {

             var data = {game_id: gameId};
            
            $http.put('api/app/updateRegisterScreenGame/' + tableObjId, data).success(function (msg) {
                
                callback(msg);
            });

        },
        
         //Cals the service to get the all entrants for all games sorted by game id
        getGamesAllEntrants: function (callback) {

            $http.get('api/app/allGamesEntrants/').success(function (msg) {
                callback(msg);
            });
        },
        
        
        deleteEntrant: function (entrantId, gameId, callback) {

             var data = {entrant_id: entrantId,
                         game_id: gameId};
            
            $http.delete('api/app/deleteGameEntrant/' + entrantId + '/' + gameId).success(function (msg) {
                
                callback(msg);
            });

        },

    };


});