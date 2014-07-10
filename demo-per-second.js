var ss = require('./');
var StringifyStream = require('./stream-classes/stringify-stream');

var perSecondStream = new ss.PerSecondSatelliteStream();
perSecondStream.on('data', function(d) { console.log(d); });