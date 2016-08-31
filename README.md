# Slack Weather BOT

Slack weather bot using natural language processing

## API Keys
- [Slack Token](https://api.slack.com/tokens)
> Create new Bot User

- [api.ai](https://api.ai)
> Upload weather.zip app and get api keys

- [OpenWeatherMap](http://openweathermap.org/appid)

## Getting Started
Update token variables or environment variables

```
var slackToken = process.env.SLACK_TOKEN || '<slack-bot-token>';
var apiaiToken = process.env.APIAI_TOKEN || '<api.ai-token>';
var weatherToken = process.env.WEATHER_TOKEN || '<openweathermap-token>';
```

## Install
```
npm install
```

## Usage
```
node index.js
```

Finally add bot user to slack!

## ToDo
- [ ] Add Screenshot/GIF
- [ ] Improve BOT reply
