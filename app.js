var express = require('express');
var app = express(),
    station = require('./src/routes/station');
var winston = require('winston');
var async = require('async');
var utils = require('./src/lib/utils');
var defaults = require('./config/defaults');
var overrides = require('./config/overrides');

if (!process.env.NODE_ENV) {
    throw new Error("NODE_ENV not set");
}

config = utils.merge(defaults, overrides);

var winstonStream = {
    write: function(message, encoding){
        winston.info(message.slice(0, -1));
    }
};
winston.add(winston.transports.File, { filename: './log/api.log' });
app.use(express.logger({stream:winstonStream}));

app.configure(function() {
    app.all('*', function(request, response, next) {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        response.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }), 
    app.use(express.static('public'));
});

app.get('/api/station/:id', station.getAllMetrics); 
app.get('/api/station/:id/swh', station.getSignificantWaveHeight);
//app.get('/api/station/:id/wwh', station.getWindWaveHeight);
//app.get('/api/station/:id/swp', station.getSignificantWavePeriod);
//app.get('/api/station/:id/apd', station.getAverageWavePeriod);

app.listen(config.api.port);
console.log("Loaded configuration: " );
utils.pp(config);
console.log('Listening on port ' + config.api.port);
 
module.exports = app;
