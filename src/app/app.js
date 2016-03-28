var app = angular.module('WeatherApp', [])
.controller('forecastCtrl', ['$scope','$filter', 'openWeatherMap', function($scope,$filter, openWeatherMap) {
    var PROVIDE_LOC = '! Please provide a location';
    var SERVER_ERROR = '! Unable to get weather information. Please try again later.'
    $scope.message = '';
    $scope.validData = false;

    var iconUrl = 'http://openweathermap.org/img/w/';
    // Get icon url
    $scope.getIconUrl = function(icon) {
      return (icon ? iconUrl + icon + '.png' : '');
    };
    // parse the date to only show day name
    $scope.parseDate = function (date) {
    	console.log(date);
      if (new Date(date*1000).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)) {
        return "Today"
      }
      else {
        return  $filter('date')(new Date(date * 1000), 'EEEE');
      }
    };      

    // On load show London weather by default
    openWeatherMap.getWeatherByCityName('london').then(function (result) {
    	console.log(result)
      $scope.forecast = result;
      $scope.validData = true;
    }, function (result) { // on failure
    	console.log("failaure " + result)
      $scope.message = SERVER_ERROR;
    });


    // Get forecast info by location
    $scope.getForecastByLocation = function() {

      if (angular.isUndefined($scope.location)) {
        $scope.message = PROVIDE_LOC;
        return;
      }

      // Get weather by city name
      openWeatherMap.getWeatherByCityName($scope.location).then(function (result) {
        $scope.forecast = result;
        $scope.message = '';
        $scope.validData = true;
      }, function (result) { // on failure
        $scope.message = SERVER_ERROR;

      });
    };

  }])
.service('openWeatherMap', ['$http', function ($http) {
    var apiKey = 'a8b0a31ffefce9140bbd7dea8abb1903';
    var apiUrl = 'http://api.openweathermap.org/data/2.5/';
    var openweathermapFactory = {};
    openweathermapFactory.getWeatherByCityName = function (location) {
        return $http.get(apiUrl+'forecast/daily?q='+location+'&lang=en&mode=json&units=metric&cnt=5&appid='+apiKey)
            .then(function(result) {
                return result.data;
            });
    };    
    return openweathermapFactory;
}]) 
