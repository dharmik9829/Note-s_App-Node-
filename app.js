const yargs = require("yargs");
const notesFunction = require("./notesFunction.js");
const chalk = require("chalk");
const { argv } = require("yargs");

yargs.command({
  command: "add",
  describe: "Adding Note",
  handler: (argv) => {
    notesFunction.addNote(argv);
  },
  builder: {
    title: {
      describe: "Add Your Note's Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Add Your Note's Body",
      demandOption: true,
      type: "string",
    },
  },
});

yargs.command({
  command: "remove",
  describe: "Remove Note By Title Name",
  handler: (argv) => {
    notesFunction.removeNote(argv);
  },
  builder: {
    title: {
      describe: "Specify a Note's Title That you want to remove",
      demandOption: true,
      type: "string",
    },
  },
});

// list notes command
yargs.command({
  command: "listNotes",
  describe: "List All Notes Title & Body",
  handler: () => {
    const data = notesFunction.listAllNotes();
    if (data.length == 0) {
      console.log("No Notes Added Yet!");
      console.log(
        chalk.red(
          "Use node filename add --title='title' --body='body' to add note"
        )
      );
    } else {
      data.forEach((e) => {
        console.log(chalk.bgBlueBright("Title :" + e.title));
        console.log(chalk.bgBlueBright("Body :" + e.body));
      });
    }
  },
});

// read a note command
yargs.command({
  command: "read",
  describe: "Fetch a notes by title name",
  handler: (argv) => {
    notesFunction.readNote(argv);
  },
  builder: {
    title: {
      describe: "Specify a Note's Title That you want to see",
      demandOption: true,
      type: "string",
    },
  },
});

yargs.parse();
