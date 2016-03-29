angular.module('weatherApp')
.controller('ForecastCtrl', ['$filter', 'OpenWeatherMap', function($filter, OpenWeatherMap) {
    var vm = this;
    var PROVIDE_LOC = '! Please provide a location';
    var SERVER_ERROR = '! Unable to get weather information. Please try again later.'
    vm.message = '';
    vm.validData = false;    

    // Get forecast info by location
    getForecastByLocation = function() {
      if (angular.isUndefined(vm.location) || vm.location.length == 0) {
        vm.message = PROVIDE_LOC;
        return;
      }

      getWeatherByCityName(vm.location)
    };


	var getWeatherByCityName = function(location) {
	  // Get weather by city name
	  OpenWeatherMap.getWeatherByCityName(location).then(function (result) {
	    vm.forecast = result;
	    vm.message = '';
	    vm.validData = true;
	  }, function (result) { // on failure
	    vm.message = SERVER_ERROR;

	  });
	} 

  // On load show London weather by default
  getWeatherByCityName('london');  

  vm.getForecastByLocation = getForecastByLocation;

  }]);