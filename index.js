'use strict';

var Botkit = require('botkit');
var Apiai = require('apiai');
var fetch = require("request")


var slackToken = process.env.SLACK_TOKEN || '<slack-bot-token>';
var apiaiToken = process.env.APIAI_TOKEN || '<api.ai-token>';
var weatherToken = process.env.WEATHER_TOKEN || '<openweathermap-token>';

var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=CITYHERE&units=metric&appid=" + weatherToken;

var weatherConditions = {
    Thunderstorm: ":zap:",
    Drizzle: ":snow_cloud:",
    Rain: ":rain_cloud:",
    Snow: ":snowflake:",
    Clear: ":sunny:",
    Clouds: ":cloud:",
    Extreme: ":tornado:",

};

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: slackToken
}).startRTM(function(err, bot, payload) {
    if (err) {
        throw new Error('Error connecting to slack: ', err)
    }
    console.log('Connected to slack');
});

var apiai = Apiai(apiaiToken);

controller.hears('', ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    var request = apiai.textRequest(message.text);

    request.on('response', function(response) {
        console.log(response.result);
        if (response.result.parameters && response.result.parameters['weather'] != undefined) {
            var city = response.result.parameters['geo-city'];
            if (city) {
                fetch(weatherURL.replace('CITYHERE', city), function(error, response, body) {
                    var Weather = JSON.parse(body);
                    if (!error && response.statusCode == 200) {
                        var temp = Weather.main.temp;
                        var condition = Weather.weather[0].main;
                        var emoji = "";
                        if (condition in weatherConditions) {
                            emoji = weatherConditions[condition];
                        }

                        bot.reply(message, "Its " + temp + "°C in " + city + " and looks " + condition + emoji);
                    }
                });
            } else {
                bot.reply(message, response.result.fulfillment.speech);
            }
        } else {
            bot.reply(message, "Sorry, please try again!");
        }
    });

    request.on('error', function(error) {
        console.log(error);
    });

    request.end()
});
