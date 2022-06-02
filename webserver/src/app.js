const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send({
		name: 'Andrew',
		yearsOld: 27
	});
})

app.get('/help', (req, res) => {
	res.send('Hello help page');
})

app.get('/about', (req, res) => {
	res.send('Hello about page');
})

app.get('/weather', (req, res) => {
	res.send('Hello from wather page');
})


const port = 3000;

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});