const request = require('request');

request('https://ow-api.com/v1/stats/pc/us/Turtle-22318/profile', function (error, response, body) {

    let data = JSON.parse(body);

    console.log(data.level);

});


