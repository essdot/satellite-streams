var RawSatelliteStream = require('../stream-classes/raw-satellite-stream');
var NullSink = require('../stream-classes/null-sink');

describe('Raw satellite stream', function(){
	//Make a raw satellite stream, with a mocked request function
	function getMockRawStream(requestRate) {
		var rss = new RawSatelliteStream({ id: 25544, requestRate: requestRate });
		
		rss._count = 0;
		rss._makeRequest = function() {
			this._count++;
			this.push(this._count.toString());
		};
		
		return rss;
	}

	//For a given duration and request rate, expect a certain number of request calls
	function expectReadCalls(expectedCalls, duration, requestRate, test, done) {
		test.timeout(duration + 50);

		var rawStream = getMockRawStream(requestRate);
		rawStream.pipe(new NullSink());

		setTimeout(function(){
			expect(rawStream._count).to.equal(expectedCalls);
			rawStream = null;
			done();
		}, duration);
	}

	// A request should be made at T + 1700ms.
	it('request is delayed', function(done){
		expectReadCalls(1, 1750, 1700, this, done);
	});

	// Given a request rate of 500ms, and a duration of 950ms, 
	// only one request should be made, at T + 500ms.
	it('does not exceed request rate', function(done){
		expectReadCalls(1, 950, 500, this, done);
	});

	// At a duration of 625ms, 3 requests should be made: 
	// T + 200ms, T + 400ms, T + 600ms
	it('does not undershoot request rate', function(done){
		expectReadCalls(3, 625, 200, this, done);
	});
});

