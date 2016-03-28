angular.module('WeatherApp')
.controller('forecastController', ['$scope','$filter', 'openWeatherMapService', function($scope,$filter, openWeatherMapService) {
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
      if (new Date(date*1000).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)) {
        return "Today"
      }
      else {
        return  $filter('date')(new Date(date * 1000), 'EEEE');
      }
    };      

    // Get forecast info by location
    $scope.getForecastByLocation = function() {
      if (angular.isUndefined($scope.location) || $scope.location.length == 0) {
        $scope.message = PROVIDE_LOC;
        return;
      }

      getWeatherByCityName($scope.location)
    };


	var getWeatherByCityName = function(location) {
	  // Get weather by city name
	  openWeatherMapService.getWeatherByCityName(location).then(function (result) {
	    $scope.forecast = result;
	    $scope.message = '';
	    $scope.validData = true;
	  }, function (result) { // on failure
	    $scope.message = SERVER_ERROR;

	  });
	} 

    // On load show London weather by default
    getWeatherByCityName('london');
  }]);