const request = require('postman-request');
require('dotenv').config();

const geocode = (address, cb) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`;

	request({url, json: true}, (err, {body: {features}}) => {
		if (err) {
			cb('Unable to connect to location service', undefined);
		} else if (features.length == 0) {
			cb('Unable to find location - try another search', undefined);	
		} else {
			cb(undefined, {
				lat: features[0].center[1],
				lon: features[0].center[0],
				location: features[0].place_name
			});
		}
	})
}


module.exports = geocode;