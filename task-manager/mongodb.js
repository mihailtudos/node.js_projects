const {ObjectId, MongoClient} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId();

console.log(id, id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
	if (error) {
		return console.log('Unable to connect to MongoDB');
	}

	// database reference
	const db = client.db(databaseName);
	// const updatePromise = db.collection('users').updateOne({ _id: new ObjectId("629dcb00cf1ce7ef98e1b64b")}, {$set: { name: 'Ian' }});

	// updatePromise.then((result) => {
	// 	console.log(result);
	// }).catch((error) => {
	// 	console.log(error);
	// })

	// db.collection('users').updateMany({ name: 'Mihail 2'}, {
	// 	$set: {
	// 		name: 'Mihail Updated'
	// 	}
	// }).then((response) => console.log(response)).catch((error) => console.log(error));

	db.collection('users').deleteMany({
		name: 'Mihail Updated'
	})
	.then((response) => console.log(response))
	.catch((error) => console.log(error));

});