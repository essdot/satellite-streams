var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

util.inherits(PrettySatelliteStream, Transform);

function PrettySatelliteStream(options) {
	Transform.call(this, { objectMode: true });

	options = options || {};
	
	this.rawStream = options.rawStream || new RawSatelliteStream(options);
	this.rawStream.pipe(this);
}

PrettySatelliteStream.prototype._format = function(obj) {
	var pretty = {};

	pretty.satellite = "Satellite " + obj.name + " (# " + obj.id + ")";
	pretty.altitude = obj.altitude.toFixed(4) + " " + abbreviateUnits(obj.units);
	pretty.latitude = obj.latitude.toFixed(4) + "º";
	pretty.longitude = obj.longitude.toFixed(4) + "º";

	return pretty;
};

PrettySatelliteStream.prototype._transform = function (chunk, encoding, done) {
	var pretty = this._format(chunk);
	this.push(pretty);
    
    done();
};

function abbreviateUnits(units) {
	if (units.toLowerCase() === 'miles') {
		return 'm';
	}

	return 'km';
}

module.exports = PrettySatelliteStream;