(function() {
    'use strict';

    function WeatherService($http) {
        var service = {};
        service.forcast = null;

        this.latitude = null;
        this.longitude = null;

        /**
         * Initialize
         *
         * @param float latitude
         * @param float longitude
         * @returns mixed
         */
        service.init = function(latitude, longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
            return $http.jsonp('https://api.forecast.io/forecast/' +
                config.weather.forecast.apiKey + '/' +
                this.latitude + ',' +
                this.longitude +
                '?units=' + config.weather.forecast.units +
                '&lang=' + config.language +
                '&callback=JSON_CALLBACK'
            ).then(function(data) {
                return service.forcast = data;
            });
        };

        /**
         * Get Current Forcast
         *
         * @return mixed
         */
        service.getCurrentForcast = function() {
            if(service.forcast === null){
                return null;
            }

            // Prepare data
            service.forcast.data.currently.date = moment.unix(service.forcast.data.currently.time).toDate();
            service.forcast.data.currently.temperature = parseFloat(service.forcast.data.currently.temperature).toFixed(1);

            return service.forcast.data.currently;
        };

        /**
         * Get Weekly Forcast
         *
         * @returns mixed
         */
        service.getWeeklyForcast = function(){
            if(service.forcast === null){
                return null;
            }

            // Loop through days and prepare data
            for(var i = 0; i < service.forcast.data.daily.data.length; i++) {
                service.forcast.data.daily.data[i].date = moment.unix(service.forcast.data.daily.data[i].time).toDate();
                service.forcast.data.daily.data[i].temperatureMin = parseFloat(service.forcast.data.daily.data[i].temperatureMin).toFixed(1);
                service.forcast.data.daily.data[i].temperatureMax = parseFloat(service.forcast.data.daily.data[i].temperatureMax).toFixed(1);
            };

            return service.forcast.data.daily.data;
        };

        /**
         * Get Hourly Forcast
         *
         * @returns mixed
         */
        service.getHourlyForcast = function() {
            if(service.forcast === null){
                return null;
            }

            // Prepare data
            service.forcast.data.hourly.date = moment.unix(service.forcast.data.hourly.time).toDate();

            return service.forcast.data.hourly;
        };

        return service;
    }

    angular.module('SmartMirror').factory('WeatherService', WeatherService);

}());