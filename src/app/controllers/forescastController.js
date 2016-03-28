angular.module('weatherApp')
.controller('ForecastCtrl', ['$filter', 'OpenWeatherMap', function($filter, OpenWeatherMap) {
    var vm = this;
    var PROVIDE_LOC = '! Please provide a location';
    var SERVER_ERROR = '! Unable to get weather information. Please try again later.'
    vm.message = '';
    vm.validData = false;

    var iconUrl = 'http://openweathermap.org/img/w/';
    // Get icon url
    getIconUrl = function(icon) {
      return (icon ? iconUrl + icon + '.png' : '');
    };
    // parse the date to only show day name
    parseDate = function (date) {
      if (new Date(date*1000).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)) {
        return "Today"
      }
      else {
        return  $filter('date')(new Date(date * 1000), 'EEEE');
      }
    };      

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
  vm.getIconUrl = getIconUrl;
  vm.parseDate = parseDate;

  }]);