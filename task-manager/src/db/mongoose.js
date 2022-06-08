const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api';

mongoose.connect(connectionURL);

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid');
			}
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Password should not contain the word password');
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		min: 18,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number');
			}
		}
	}
});


const user = new User({
	name: 'Mihail   ',
	age: 19,
	email: 'Mihail@gmail.com',
	password: 'passwww1'
});

user.save()
	.then(response 	=> console.log(response))
	.catch(error 	=> console.log('Error!', error.message));

const Task = mongoose.model('Task', {
	description: {
		type: String,
		trim: true,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	}
})

const task = new Task({
	description: 'Clean the house   ',
});

task.save().then(result => console.log(result)).catch(error => console.log('Error', error.message));