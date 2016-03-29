angular.module('weatherApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/forecast', {templateUrl: 'partials/forecast.html', controller: 'ForecastCtrl as weather'});
  $routeProvider.otherwise({redirectTo: '/forecast'});
}]);
