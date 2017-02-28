

var app = angular.module('app', []);
app.controller('mainCtrl', mainCtrl)


function mainCtrl($scope)
{
    $scope.seed = "";
    $scope.gender = "male";
    $scope.countryCode = "US";
    $scope.findNewIdent = function () {

    }
    $scope.findRandomIdent = function () {
        $.getJSON(baseURL, function (data) {
            debugger;
            var NameInfo = data["results"][0]["name"];
            var LocationInfo = data["results"][0]["location"];
            var emailInfo = data["results"][0]["email"];
            var dob = data["results"][0]["dob"];
            var phone = data["results"][0]["phone"];
            var picture = data["results"][0]["picture"].large;
            var user = new newident(NameInfo, LocationInfo, emailInfo, dob, phone, picture);
            $scope.ident = user;
        })
    }
    $scope.ident = {}
}

var baseURL = "https://randomuser.me/api";
var newident = function(nameInfo, locationInfo, emailInfo, dateOfBirth, phoneNumber, pictureInfo)
{
    var self = this;
    self.name = upperCase(nameInfo["title"]) + " " + upperCase(nameInfo["first"]) + " " + upperCase(nameInfo["last"])
    self.street = locationInfo["street"];
    self.city = upperCase(locationInfo["city"])
    self.state = upperCase(locationInfo["state"])
    self.postCode = locationInfo["postcode"];
    self.email = emailInfo;
    self.dateOfBirth = dateOfBirth;
    self.phone = phoneNumber;
    self.pictureURL = pictureInfo;
}

var upperCase = function(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}