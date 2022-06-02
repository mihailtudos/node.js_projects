const chalk = require('chalk')
const note = require('./notes');
const yargs = require('yargs');
const fs = require('fs');

//cust yargs version 
yargs.version = '1.0.1';

//create add 
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'Note body, what note should be about',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		note.addNotes(argv.title, argv.body);
	}
})

// create remove
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title to be removed',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		note.removeNote(argv.title)
	},
})

// create list read 
yargs.command({
	command: 'read',
	describe: 'Read a note',
	builder: {
		title: {
			describe: 'Find a specific note',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		note.readNote(argv.title)
	}
})

// create list notes
yargs.command({
	command: 'list',
	describe: 'List all notes',
	handler() {
		note.listNotes();
	}
})

// add, remove, read, list

// invoking yargs commands
yargs.parse();
// console.log(yargs.argv.title);
