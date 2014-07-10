var common = require('./common.js');
var https = require('https');
var stream = require('stream');
var util = require('util');

var Readable = stream.Readable;

util.inherits(CountStream, Readable);

function CountStream() {
	Readable.call(this, { objectMode: true });
	this._count = 0;
	this._max = 8;
	this._rate = 250;
}

CountStream.prototype._read = function() {
	if(!this._timer) {
		this._request();

		this._timer = setInterval(function() {
			this._request();
		}.bind(this), this._rate);
	}
};

CountStream.prototype._request = function() {
	if (this._count >= this._max) {
		console.log('last');
		this.push(null);
		clearInterval(this._timer);
		return;
	}

	this._count++;
	this.push(this._count.toString());
};

module.exports = CountStream;