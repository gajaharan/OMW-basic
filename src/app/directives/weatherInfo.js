angular.module('weatherApp')
.directive('weatherInfo', ['$filter', function($filter) {
    return {
        restrict: 'A',

        templateUrl: 'partials/weather-info.html',      

        scope: {
            dailyForecast: '=forecast',      
        },

        link: function(scope, ele, attrs) {
            var iconUrl = 'http://openweathermap.org/img/w/';
            // Get icon url
            scope.getIconUrl = function(icon) {
                return (icon ? iconUrl + icon + '.png' : '');
            };
            // parse the date to only show day name
            scope.parseDate = function (date) {
                if (new Date(date*1000).setHours(0,0,0,0) === new Date().setHours(0,0,0,0)) {
                    return "Today"
                }
                else {
                    return  $filter('date')(new Date(date * 1000), 'EEEE');
                }
            };
        }
    }
}]);