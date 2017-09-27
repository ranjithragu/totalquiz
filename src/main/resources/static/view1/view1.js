'use strict';

angular.module('myApp.view1', ['ngRoute']).controller('loginController', ['$scope', '$location', '$log', 'AjaxService','detailService','$rootScope','$cookieStore',
    function($scope, $location, $log, AjaxService,detailService,$rootScope,$cookieStore) {
        var self = $scope;
        self.user = {};



$().ready(function() {
    $("#card").flip({
      trigger: 'manual'
    });
});


$(".signup_link").click(function() {

    $(".signin_form").css('opacity', '0');
    $(".signup_form").css('opacity', '100');
    
    
    $("#card").flip(true);
    
    return false;
});

$("#unflip-btn").click(function(){
  
    $(".signin_form").css('opacity', '100');
    $(".signup_form").css('opacity', '0');
    
    $("#card").flip(false);
    
    return false;
    
});



        $scope.onLogin = function(user) {
            $scope.loginDetails = user;
            
            AjaxService.login($scope.loginDetails).then(function(response) {
                $rootScope.redirect = true;
                $rootScope.active = true;
                self.rest = response;
                self.all = response.data.result;
                self.serverData = self.rest;
                console.log("self.rest ==============>",self.rest );

                $cookieStore.put('user',self.all.id);
                console.log("$cookieStore.get('user',self.all.id);=========>",$cookieStore.get('user'));
                detailService.loggedUserDetails(self.all);
                console.log("detailService============>",detailService.loggedUser);
                if(self.rest.data.responseError === " Invalid UserName or Password "){
                 $scope.error = "Invalid username or password ";
                }
                if ((self.user.userName === self.rest.data.result.userName) && ("USER" === self.rest.data.result.role[0])) {
                    $location.path('/view2');
                }
                if ((self.user.userName === self.rest.data.result.userName) && ("ADMIN" === self.rest.data.result.role[0])) {
                    $location.path('/side');
                }
            }, function(error) {
                $location.path('/landUser');
                $log.log("Error while loading urls!");
            });
        };
    }
]);
