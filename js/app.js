/**
 * Created by ImRTee on 13/06/2017.
 */
var module1 = angular.module('module1', []);


module1.controller('streamersController', function ($scope){
    $scope.streamers = [{name: 'Bejersen'},{name:'Box Box'},{name:'FreeCodeCamp'}];

    $scope.addNewStreamers= function(){
        console.log($scope.newStreamerName);
        $scope.streamers.push({name: $scope.newStreamerName});

    };

});







//Jquery part
$(document).ready(function(){
    $('#addButton').click(function(){
        $('.modal-background').css('display','block');
    });
    $('.close-icon').click(function(){
        $('.modal-background').css('display','none');
    })
    $('#addNewStreamerButton').click(function(){
        $('.modal-background').css('display','none');
        $('#newStreamerInput').val('');
    })
});