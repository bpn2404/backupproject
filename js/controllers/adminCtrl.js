'use strict';

//angular.module('angularModalService')

app.controller('adminCtrl', ['$scope', '$rootScope', '$location', '$filter', 'adminService', 'commonService',
     function ($scope, $rootScope, $location, $filter, adminService, commonService) {

        $scope.selectedGame = undefined;
        $scope.registerScreenGameIdObj = undefined;
        $scope.showGameStarts = false;
        $scope.allGamesAllEntrants = [];
        $scope.rowCollection = [];


        $scope.setUpAdminScreen = function () {

            $scope.games = [{
                name: "Select"
        }];
            $scope.getScheduledGamesInFuture();
            $scope.getAllGamesEntrants();

            //1. Check if there is a game set up already on the register screen
            commonService.getRegisterScreenGameId(function (results) {

                if (results.length != 0) {
                    $scope.registerScreenGameIdObj = results[0];
                    //If there is one id then fetch the game by id and set up admin screen, there should be only one id
                    commonService.getGameById(results[0].game_id, function (gameResult) {

                        var img = document.getElementById("adminGamePic");
                        img.src = gameResult[0].main_pic_url;

                        for (var i = 0; i < $scope.games.length; i++) {
                            if ($scope.games[i].id === gameResult[0].id) {
                                $scope.selectedGame = $scope.games[i];
                            }
                        }

                    });
                }
            });

        };


        /* Gets the games in the future for the select game drop down */
        $scope.getScheduledGamesInFuture = function () {

            adminService.getRegisterScreenGames(function (results) {


                angular.forEach(results, function (result) {

                    var gameObj = {
                        id: result.id,
                        main_pic_url: result.main_pic_url,
                        ball_pic_url: result.ball_pic_url,
                        ball: {
                            x: result.ball_x,
                            y: result.ball_y
                        },
                        g_date: moment(result.g_date),
                        name: moment(result.g_date).format('llll')
                    }

                    $scope.games.push(gameObj);

                });


            });

        };



        //Sets the id of the game which will be displayed on the register screen 
        $scope.setGameOnRegisterScreen = function () {

            if ($scope.registerScreenGameIdObj === undefined && $scope.selectedGame != undefined) {
                adminService.setGameOnRegister($scope.selectedGame.id, function (results) {

                    if (results.status === "success") {
                        $scope.setUpAdminScreen();
                    }
                });
            } else {

                if ($scope.selectedGame) //Because when user changes the selection in drop down, the event is fired twice and the selectedGame is undefined on second event so need to check this 
                {
                    $scope.updateGameOnRegisterScreen($scope.selectedGame.id);
                }
            }

        };

        //Updates the record in the g_register_game table 
        $scope.updateGameOnRegisterScreen = function (gameId) {

            adminService.updateGameOnRegister($scope.selectedGame.id, $scope.registerScreenGameIdObj.id, function (results) {

                if (results.status === "success") {
                    $scope.setUpAdminScreen();
                }
            });

        };

        $scope.startCurrentGame = function () {

            commonService.updateState("start", function (results) {

                if (results.status === "success") {
                    console.log("START GAME update state success in admin");
                    $scope.showGameStarts = true;
                    setTimeout(function () {
                        $scope.showGameStarts = false;
                        if (!$scope.$$phase) {
                            $scope.$apply();
                        }
                    }, 5000);

                }
            });

        };





        /* Gets the games in the future for the select game drop down */
        $scope.getAllGamesEntrants = function () {

            adminService.getGamesAllEntrants(function (results) {

                angular.forEach(results, function (result) {

                    var allEntrantsObj = {
                        id: result.id,
                        f_name: result.f_name,
                        l_name: result.l_name,
                        email: result.email,
                        g_name: moment(result.g_date).format('dddd Do MMMM') + " at " + moment(result.g_date).format('HH:mm'),
                        g_date: moment(result.g_date),
                        game_id: result.game_id

                    }

                    $scope.rowCollection.push(allEntrantsObj);

                });


                $scope.getGamesAllEntrants = [].concat($scope.rowCollection);
            });

        };


        $scope.removeEntrant = function (row) {

            console.log(row);

            adminService.deleteEntrant(row.id, row.game_id, function (results) {

                if (results.status === "success") {
                    var index = $scope.rowCollection.indexOf(row);
                    if (index !== -1) {
                        $scope.rowCollection.splice(index, 1);
                    }
                }

            });

        };


    }]);