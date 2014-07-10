var https = require('https');
var stream = require('stream');
var util = require('util');

var Readable = stream.Readable;

util.inherits(RawSatelliteStream, Readable);

function RawSatelliteStream(options) {
	Readable.call(this, { objectMode: true });

	options = getOptions(options);
	
	this._id = options.id;
	this._requestRate = options.requestRate;
}

RawSatelliteStream.prototype._read = function () {
	if(this._timer) { return; }

	this._timer = setInterval(function(){
		this._makeRequest();
	}.bind(this), this._requestRate);
};

RawSatelliteStream.prototype._makeRequest = function() {
	var options = {
		hostname: 'api.wheretheiss.at',
		path: '/v1/satellites/',
		rejectUnauthorized: false
	};

	options.path += this._id;

	var self = this;

	https.get(options, function(response) {
		var dataArray = [];
		response.on('data', function(data) {
			dataArray.push(data.toString());
		});

		response.on('end', function() {
			var fullData = dataArray.join('');
			self.push(JSON.parse(fullData));
		});
	});
};

function getOptions(options) {
	options = options || {};

	return {
		id: options.id || 25544,
		requestRate: options.requestRate || 2500,
		rawStream: options.rawStream
	};
}

module.exports = RawSatelliteStream;