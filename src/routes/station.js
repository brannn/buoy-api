r = require('rethinkdb');

var station = {

    getAllMetrics: function(request,response) {
        r.connect( {host: config.db.buoy.host, port: config.db.buoy.port}, function(err, conn) {
            if (err) throw err;
            connection = conn;
            connection.use("buoy")
            connection.close(function(err) { if (err) throw err; })
            r.table('bar').filter({station_id: parseInt(request.params.id)}).orderBy(r.asc('timestamp')).limit(25).run(connection, function(err, cursor) {
                if (err) throw err;
            cursor.toArray(function(err, result) {
                if (err) throw err;
            response.json(result);
            connection.close
                });
            });
        });
    },

    getSignificantWaveHeight: function(request,response) {
        r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
            if (err) throw err;
            connection = conn;
            connection.use("buoy")
            connection.close(function(err) { if (err) throw err; })
            r.table('bar').filter({station_id: parseInt(request.params.id)}).orderBy(r.asc('timestamp')).run(connection, function(err, cursor) {
                if (err) throw err;
            cursor.toArray(function(err, result) {
                if (err) throw err;
            response.json(result);
            connection.close
                });
            });
        });
    }
};

module.exports = station;
