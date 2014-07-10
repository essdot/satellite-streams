var stream = require('stream');
var util = require('util');

var Writable = stream.Writable;

util.inherits(NullSink, Writable);

function NullSink() {
	Writable.call(this);
}

NullSink.prototype.write = function() { return true; };

module.exports = NullSink;