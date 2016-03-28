angular.module('weatherApp')
.service('OpenWeatherMap', ['$http', function ($http)  {
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
}]);