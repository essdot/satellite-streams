var ss = require('./');

var perSecondStream = new ss.PerSecondSatelliteStream();
perSecondStream.on('data', function(d) { console.log(d); });