var config = {
    // Language
    language : 'nl',
    // Compliments
    compliments : {
        updateInterval : (60 * 60 * 1000), // 15 minutes
        morning : [
            'Goedemorgen, mooierd!',
            'Een fijne dag!',
            'Lekker geslapen?',
        ],
        afternoon : [
            'Hallo, knappert!',
            'Jij ziet er sexy uit!!',
            'Je ziet er goed uit vandaag!!',
        ],
        evening : [
            'Wow, je ziet er hot uit!',
            'Je ziet er leuk uit!',
            'Hi, sexy!',
        ],
        night : [
            'Hey, slaapkop!',
            'Moet jij niet slapen?',
            'Kijk uit waar je loopt!',
        ],
    },
    // Weather
    weather : {
        updateInterval: (15 * 60 * 1000), // 15 minutes
        forecast : {
            apiKey : '57e2a1769dc2df4222573046f16dc9c9',
            units : 'auto',
        },
    },
    // News
    news : {
        updateInterval: (15 * 60 * 1000), // 15 minutes
    }
};