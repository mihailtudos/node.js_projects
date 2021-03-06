const express = require('express');
const Task = require('../models/task');
const router = express.Router();

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch(error) {
		res.status(500).send(error) 
	};
});

router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find();
		return res.send(tasks);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.get('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task){
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
});

router.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];
	const isValidOperation = updates.every(update => allowedUpdates.includes(update));

	if (!isValidOperation) {
		return res.status(400).send({error: 'Not allowed to update given parameters.'});
	}

	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});


router.delete('/tasks/:id', async (req, res) => {
	try {
		const task = await Task.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;