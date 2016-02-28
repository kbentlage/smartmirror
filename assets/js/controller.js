(function (angular) {
    'use strict';

    /**
     * Smart Mirror Controller
     *
     * @param ComplimentsService
     * @param GeolocationService
     * @param WeatherService
     * @param NewsService
     * @param $scope
     * @param $interval
     * @constructor
     */
    function SmartMirrorController(
        ComplimentsService,
        GeolocationService,
        WeatherService,
        NewsService,
        $scope,
        $interval
    ) {

        /**
         * Init
         *
         * @return void
         */
        this.init = function() {

            // Update date and time (every second)
            this.updateDateTime();
            $interval(this.updateDateTime, 1000);

            // Update compliments
            this.updateCompliments();
            $interval(this.updateCompliments, config.compliments.updateInterval);

            // Update weather
            this.updateWeather();
            $interval(this.updateWeather, config.weather.updateInterval);

            // Update news
            this.updateNews();
            $interval(this.updateNews, config.news.updateInterval);
        };

        /**
         * Update Date Time
         *
         * @return void
         */
        this.updateDateTime = function() {
            $scope.dateTime = new Date();
        };

        /**
         * Update Compliments
         *
         * @return void
         */
        this.updateCompliments = function() {
            $scope.compliment = ComplimentsService.get();
        };

        /**
         * Update Weather
         *
         * @return void
         */
        this.updateWeather = function() {
            // Get current geolocation
            GeolocationService.getLocation({enableHighAccuracy: true}).then(function(position)
            {
                WeatherService.init(position.coords.latitude, position.coords.longitude).then(function()
                {
                    $scope.weatherCurrentForcast = WeatherService.getCurrentForcast();
                    $scope.weatherWeeklyForcast = WeatherService.getWeeklyForcast();
                    $scope.weatherHourlyForcast = WeatherService.getHourlyForcast();
                });
            });
        };

        /**
         * Update News
         *
         * @return void
         */
        this.updateNews = function() {
            // Init news service
            NewsService.init().then(function()
            {
                $scope.news = NewsService.fetch();
            });
        };

        // Init app
        this.init();
    }

    angular.module('SmartMirror').controller('SmartMirrorController', SmartMirrorController);

}(window.angular));