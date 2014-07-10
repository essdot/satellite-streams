var stream = require('stream');
var util = require('util');
var common = require('../common');
var RawSatelliteStream = require('./raw-satellite-stream');

var Transform = stream.Transform;

util.inherits(PerSecondSatelliteStream, Transform);

function PerSecondSatelliteStream(options) {
	Transform.call(this, { objectMode: true });

	options = common.getOptions(options);

	this.rawStream = options.rawStream || new RawSatelliteStream(options.id, options.requestRate);
	this.rawStream.pipe(this);
}

PerSecondSatelliteStream.prototype._calculate = function(current, previous) {
	if(!current || !previous || !current.timestamp || !previous.timestamp) { return {}; }
	
	var timeDelta = current.timestamp - previous.timestamp;
	var latDelta, longDelta;

	if (timeDelta > 0) {
	
		latDelta = current.latitude - previous.latitude;
		longDelta = current.longitude - previous.longitude;

		return {
			startTime: previous.timestamp,
			endTime: current.timestamp,
			timeDelta: timeDelta,
			latitudePerSecond: latDelta / timeDelta,
			longitudePerSecond: longDelta / timeDelta
		};
	}
};

PerSecondSatelliteStream.prototype._transform = function(chunk, encoding, done) {
	if(this._previousChunk) {
		var result = this._calculate(chunk, this._previousChunk);

		if(result) { this.push(result); }
	}

	this._previousChunk = chunk;

	done();
};

module.exports = PerSecondSatelliteStream;