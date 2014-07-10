var PerSecondSatelliteStream = require('../stream-classes/per-second-satellite-stream');

describe('Per-second satellite stream', function(){

	it('calculates correctly', function(){
		var observation1 = {
			latitude: -28.24,
			longitude: 166.32,
			timestamp: 1404973375
		};

		var observation2 = {
			latitude: -30.38,
			longitude: 168.59,
			timestamp: 1404973422
		};

		var expected = {
			startTime: 1404973375,
			endTime: 1404973422,
			timeDelta: 47,
			latitudePerSecond: -0.045531914893617034,
			longitudePerSecond: 0.04829787234042575
		};

		var calculated = PerSecondSatelliteStream.prototype._calculate(observation2, observation1);

		expect(calculated).to.deep.equal(expected);
	});

	it('constructs raw stream', function() {
		var pss1 = new PerSecondSatelliteStream();
		var pss2 = new PerSecondSatelliteStream();

		expect(pss1.rawStream).not.to.equal(pss2.rawStream);

		pss1 = null;
		pss2 = null;
	});

	it('takes raw stream as input', function() {
		var pss1 = new PerSecondSatelliteStream();
		var pss2 = new PerSecondSatelliteStream({ rawStream: pss1.rawStream });

		expect(pss1.rawStream).to.equal(pss2.rawStream);

		pss1 = null;
		pss2 = null;
	});
});