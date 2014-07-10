var ss = require('./');
var StringifyStream = require('./stream-classes/stringify-stream');

var rawStream = new ss.RawSatelliteStream();
var stringStream = new StringifyStream();

rawStream.pipe(stringStream).pipe(process.stdout);