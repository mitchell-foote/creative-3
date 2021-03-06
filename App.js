﻿var app = angular.module('app', []);
app.controller('mainCtrl', mainCtrl);

var baseURL = "https://randomuser.me/api/";

function mainCtrl($scope) {
    $scope.seed;
    $scope.gender = "male";
    $scope.countryCode = "US";
    $scope.findNewIdent = function () {
        var newURL = baseURL + "?gender=" + $scope.gender.toLowerCase();
        if ($scope.seed)
        {
            newURL += "&seed=" + $scope.seed;
        }
        if ($scope.countryCode)
        {
            newURL += "&nat=" + $scope.countryCode.toLowerCase();
        }
        $.getJSON(newURL, function (data) {
            var NameInfo = data.results[0].name;
            var LocationInfo = data.results[0].location;
            var emailInfo = data.results[0].email;
            var dob = data.results[0].dob;
            var phone = data.results[0].phone;
            var picture = data.results[0].picture.large;
            var user = new newident(NameInfo, LocationInfo, emailInfo, dob, phone, picture);
            $scope.ident = user;
            $scope.$apply();
        })
    };
    $scope.findRandomIdent = function () {
        $.getJSON(baseURL, function (data) {
            var NameInfo = data.results[0].name;
            var LocationInfo = data.results[0].location;
            var emailInfo = data.results[0].email;
            var dob = data.results[0].dob;
            var phone = data.results[0].phone;
            var picture = data.results[0].picture.large;
            var user = new newident(NameInfo, LocationInfo, emailInfo, dob, phone, picture);
            $scope.ident = user;
            $scope.$apply();
        });
    };
    $scope.ident = new newIdentCurrent();
    $scope.ident.pictureURL = "Images/default.png";
}


var newident = function(nameInfo, locationInfo, emailInfo, dateOfBirth, phoneNumber, pictureURL) {
    var self = this;
    self.name = upperCase(nameInfo.title) + " " + upperCase(nameInfo.first) + " " + upperCase(nameInfo.last);
    self.street = locationInfo.street;
    self.city = upperCase(locationInfo.city);
    self.state = upperCase(locationInfo.state);
    self.postCode = locationInfo.postcode;
    self.email = emailInfo;
    self.dateOfBirth = dateOfBirth;
    self.phone = phoneNumber;
    self.pictureURL = pictureURL;
};

var newIdentCurrent = function () 
{
    var self = this
    self.name = ""
    self.street = ""
    self.city = ""
    self.state = ""
    self.postCode = ""
    self.email = ""
    self.dateOfBirth = ""
    self.phone = ""
    self.pictureURL = "";
}

var upperCase = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};