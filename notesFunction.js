// function for notes

const chalk = require("chalk");
const fs = require("fs");
const { argv } = require("process");
const { boolean } = require("yargs");

const addNote = (argv) => {
  // load previous notes inside notes array
  const notes = listAllNotes();

  const sameTitle = notes.filter((e) => {
    if (e.title == argv.title) {
      return notes;
    }
  });

  debugger;

  if (sameTitle.length < 1) {
    // push note info in notes
    notes.push({
      title: argv.title,
      body: argv.body,
    });

    // convert array into string
    const arrayInString = JSON.stringify(notes);
    fs.writeFileSync("notes.json", arrayInString);

    console.log("Note Added Successfully!");
  } else {
    console.log(`Title is Already Exists use Different Title and try again`);
  }
};

// list All Notes
const listAllNotes = () => {
  // read data from json File
  const readData = fs.readFileSync("notes.json");
  if (readData.length != 0) {
    const stringData = readData.toString();
    const noteData = JSON.parse(stringData);
    return noteData;
  } else {
    return [];
  }
};

// remove note
const removeNote = (argv) => {
  const readData = listAllNotes();

  const newData = readData.filter((e) => {
    if (e.title == argv.title) {
    } else {
      return e;
    }
  });

  if (newData.length == readData.length) {
    console.log(chalk.red("The Note You Specified Not Found!"));
  } else {
    // convert array into string
    const arrayInString = JSON.stringify(newData);
    fs.writeFileSync("notes.json", arrayInString);
    console.log(chalk.bgBlue("Note Deleted Successfully!"));
  }
};

// read a note
const readNote = (argv) => {
  const readData = listAllNotes();
  const returnNote = readData.find((e) => {
    if (e.title == argv.title) {
      return e;
    }
  });

  if (returnNote) {
    console.log(chalk.bgCyanBright(returnNote.title));
    console.log(chalk.bgCyanBright(returnNote.body));
  } else {
    console.log(chalk.bgRed("Note Not Found!"));
  }
};

module.exports = {
  addNote,
  removeNote,
  listAllNotes,
  readNote,
};
