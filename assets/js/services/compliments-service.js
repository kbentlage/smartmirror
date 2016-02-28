(function() {
    'use strict';

    function ComplimentsService() {
        var service = {};

        service.current = null;
        service.list = {
            'morning' : config.compliments.morning,
            'afternoon' : config.compliments.afternoon,
            'evening' : config.compliments.evening,
            'night' : config.compliments.night,
        };

        /**
         * Get
         *
         * @return void
         */
        service.get = function() {
            // Get current hour
            var hour = moment().hour();
            var list = [];

            // Morning
            if(hour >= 6 && hour < 12)
            {
                list = service.list.morning.slice();
            }
            // Afternoon
            else if(hour >= 12 && hour < 18)
            {
                list = service.list.afternoon.slice();
            }
            // Evening
            else if(hour >= 18 && hour < 24)
            {
                list = service.list.evening.slice();
            }
            // Night
            else
            {
                list = service.list.night.slice();
            }

            // Determine current compliment key
            var currentKey = list.indexOf(service.current);

            // If current key exists in list, remove it so we don't see it again
            if(currentKey !== -1)
            {
                list.splice(currentKey, 1);
            }

            // Select random compliment from list
            var randomIndex = Math.floor(Math.random() * list.length);
            return service.current = list[randomIndex];
        };

        return service;
    };

    angular.module('SmartMirror').factory('ComplimentsService', ComplimentsService);

}());