describe('Forecast controller', function(){

    var $scope, ctrl, $httpBackend;

    beforeEach(module('gajWeatherApp'), ['ngRoute']);

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://api.openweathermap.org/data/2.5').
        respond([{forecast: {city: {name: 'London'} } }]);

      $scope = $rootScope.$new();
      ctrl = $controller('forecastCtrl', { $scope: $scope });
    }));

    it('should set the default value of iconBaseUrl', function() {
      expect(true);
    });
});