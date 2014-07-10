var stream = require('stream');
var util = require('util');

var Transform = stream.Transform;

util.inherits(StringifyStream, Transform);

function StringifyStream(stream) {
	Transform.call(this, { objectMode: true });

	if(stream) {
		this.pipeStream(stream);
	}
}

StringifyStream.prototype.pipeStream = function(stream) {
	this._stream = stream;
	this._stream.pipe(this);
};

StringifyStream.prototype._transform = function(chunk, encoding, done) {
	if(chunk) {
		this.push(JSON.stringify(chunk) + '\n');
	}
	done();
};

module.exports = StringifyStream;