// З використанням бібліотеки commander

const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case "get":
      const getContact = await getContactById(id);
      console.log(getContact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Contact id")
  .option("-n, --name <name>", "Contact name")
  .option("-e, --email <email>", "Contact email")
  .option("-p, --phone <phone>", "Contact phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);

// З використанням бібліотеки yargs

// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } = require("./contacts");

// async function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case "list":
//       const contacts = await listContacts();
//       console.log(contacts);
//       break;

//     case "get":
//       const getContact = await getContactById(id);
//       console.log(getContact);
//       break;

//     case "add":
//       const newContact = await addContact(name, email, phone);
//       console.log(newContact);
//       break;

//     case "remove":
//       const deleteContact = await removeContact(id);
//       console.log(deleteContact);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);

// invokeAction(argv);
