var ss = require('./');

var rawStream = new ss.RawSatelliteStream();
rawStream.on('data', function(d) { console.log(d); });