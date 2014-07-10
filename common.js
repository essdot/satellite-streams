function getOptions(options) {
	options = options || {};

	return {
		id: options.id || 25544,
		requestRate: options.requestRate || 2500,
		rawStream: options.rawStream
	};
}

function abbreviateUnits(units) {
	if (units.toLowerCase() === 'miles') {
		return 'm';
	}

	return 'km';
}

module.exports.getOptions = getOptions;
module.exports.abbreviateUnits = abbreviateUnits;
