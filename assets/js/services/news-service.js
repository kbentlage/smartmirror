(function() {
    'use strict';

    function NewsService($http) {
        var service = {};
        service.data = null;

        /**
         * Initialize
         *
         * @param float latitude
         * @param float longitude
         * @returns mixed
         */
        service.init = function() {
            return $http.post('/protected/xmlToJson.php', {
                url : 'http://www.nu.nl/rss/Algemeen'
            }).then(function(response) {
                return service.data = response.data;
            });
        };

        /**
         * Fetch
         *
         * @return void
         */
        service.fetch = function() {
            if(service.data === null){
                return null;
            }

            // Loop through articles and prepare data
            for(var i = 0; i < service.data.channel.item.length; i++) {
                service.data.channel.item[i].date = new Date(service.data.channel.item[i].pubDate);
            }

            return service.data.channel.item;
        };

        return service;
    }

    angular.module('SmartMirror').factory('NewsService', NewsService);

}());