/**
 * Created by ImRTee on 13/06/2017.
 */
var module1 = angular.module('module1', []);

module1.factory('TwitchAPI',function($http){
    var obj ={};

    obj.getStatus = function(username){
        return $http.jsonp(`https://wind-bow.glitch.me/twitch-api/streams/${username.toLowerCase()}?callback=JSON_CALLBACK`);
    };
    obj.getChannel = function(username){
        return $http.jsonp(`https://wind-bow.glitch.me/twitch-api/channels/${username.toLowerCase()}?callback=JSON_CALLBACK`);
    };
    obj.getBio= function(username){
        return $http.jsonp(`https://wind-bow.glitch.me/twitch-api/users/${username.toLowerCase()}?callback=JSON_CALLBACK`);
    };

    return obj
});




module1.controller('streamersController', function ($scope,TwitchAPI){
    $scope.streamers =
        [
            {
                name: 'OPL',
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            },
            {
                name: 'freecodecamp',
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            },
            {
                name: 'esl_csgo',
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            },
            {
                name: 'OgamingSC2',
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            },
            {   name: "ESL_SC2",
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            },
            {
                name: "cretetion",
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            },
            {
                name: "noobs2ninjas",
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            },
            {
                name: "habathcx",
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            },
            {
                name: "RobotCaleb",
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            },
            {
                name: "fadskjfkas",
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png'
            }

        ];

    $scope.sortField = 'ALl';
    $scope.searchTitle = "All";
    function update(){
    $scope.streamers.forEach(function(user) {

        TwitchAPI.getChannel(user.name).success(function (response) {
            if (response.hasOwnProperty('error')){
                user.bio = response.message;
                $(`.${user.name}`).popover({trigger: "hover", placement:"bottom"});
                user.thumbnail = 'https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_error_man_male_profile_warning-512.png';
            } else{
                if (response.logo === null){
                    user.thumbnail = 'http://stock.wikimini.org/w/images/9/95/Gnome-stock_person-avatar-profile.png';
                    user.bio = 'The streamer needs to be online to show the bio';
                    $(`.${user.name}`).popover({trigger: "hover", placement:"top"});
                }else {
                    user.thumbnail = response.logo;
                }
                user.link = response.url;
            }
        });

        TwitchAPI.getStatus(user.name).success(function (response) {
            if (response.stream) {
                user.status = `online`;
            }else {
                user.status = 'offline';
            }

            if (user.status === 'online'){

                TwitchAPI.getBio(user.name).success(function (response) {
                    if (response.bio) {
                        user.bio = response.bio;
                    } else {
                        user.bio = 'The streamer does not have bio';
                    }

                   $(`.${user.name}`).popover({trigger: "hover", placement:"top"})
                });
            }




        });

    });

    };

    update();


    $scope.addNewStreamers= function(){
        let userNotAdded = true;
        for (var i = 0; i < $scope.streamers.length; i++){
            if ( $scope.newStreamerName.toLowerCase() === $scope.streamers[i].name.toLowerCase() ){
                userNotAdded = false;
                break;
            }
        }
        if (userNotAdded) {
            $scope.streamers.push({
                name: $scope.newStreamerName,
                thumbnail: 'http://www.freeiconspng.com/uploads/load-icon-png-8.png',
            });
            $scope.newStreamerName = '';
            $('.modal-background').css('display', 'none');
            update();
        } else {
            $('.modal-background-noti').css('display','block');
        }
    };
    $scope.removeName = function(name){
        var i = $scope.streamers.indexOf(name);
        $scope.streamers.splice(i,1);
        $('div.popover').css('visibility','hidden');
    };
    $scope.closeNoti = function(){
        console.log('dssdf');
        $('.modal-background-noti').css('display','none');
    };



});







//Jquery part
$(document).ready(function(){
    $('#addButton').click(function(){
        $('.modal-background').css('display','block');
    });
    $('.close-icon').click(function(){
        $('.modal-background').css('display','none');
    });
    $('.close-instruction-icon').click(function(){
       $('.instruction-background').css('display','none')
    });


});