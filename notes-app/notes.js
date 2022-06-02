const fs = require('fs');
const chalk = require('chalk')

const addNotes = (title, body) => {
	const notes = loadNotes();
	const duplicateNote = notes.find(note => note.title.toLowerCase() === title.toLowerCase());
	
	if (!duplicateNote) {
		notes.push({
			title,
			body
		});
		saveNotes(notes);
		console.log(chalk.bgGreen('New note added'));
	} else {
		console.log(chalk.bgRed('Title taken'));
	}
}

const removeNote = (title) => {
	const notes = loadNotes();
	const newNotes = notes.filter(note => note.title.toLowerCase() != title.toLowerCase());

	if (notes.length === newNotes.length) {
		console.log(chalk.bgRed('No note found'));
	} else {
		console.log(chalk.bgGreen.black('Note removed'));
		saveNotes(newNotes);
	}
}

const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.bgGreen('\nYour notes: \n\n'));
	notes.forEach((note, index) => {
		console.log('\n====================================');
		console.log(`${index++}.\t${chalk.bgGreen('Title: ') + note.title}\n\t${chalk.bgGreen('Body: ') + note.body}`);
		console.log('====================================\n');
	});
}

const readNote = title => {
	const notes = loadNotes();
	const note = notes.find(note => note.title.toLowerCase() === title.toLowerCase());
	if (note) {
		console.log(chalk.bgGreen(note.title));
		console.log(note.body);
	} else {
		console.log(chalk.bgRed('Note not found'));
	}
}

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch (error) {
		return [];
	}
}

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
	addNotes,
	removeNote,
	listNotes,
	readNote
};