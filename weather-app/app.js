const geocode = require('./utils/geoceode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');

const address = process.argv[2];
if (address) {
	geocode(address, (err, {lat, lon} = {}) => {	
		if(err) {
			return console.log(chalk.bgRed('Error:'), err);
		} 
		//call forecast
		forecast(lat, lon, (err, data) => {
			if (err) {
				return console.log(chalk.bgRed('Error:'), err);
			} 
			console.log(chalk.bgGreen.black('Data:'), data);
		})
	});
} else {
	console.log('====================================');
	console.log('Please provide a location.');
	console.log('====================================');
}

