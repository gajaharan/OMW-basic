module.exports = function(config){
    config.set({
    basePath : '',

    files : [
      'bower_components/angular/angular.js',
      'bower_components/angular/angular-*.js',
      'bower_components/angular-route/angular-route.js',      
      'bower_components/angular-mocks/angular-mocks.js',
      'src/app/*.js',
      'src/app/components/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}