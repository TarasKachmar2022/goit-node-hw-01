// Варіант з використанням бібліотеки commander

const fs = require("node:fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function writeContacts(contacts) {
  return await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2),
    "utf-8"
  );
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const removedContact = contacts.splice(contactIndex, 1);
  await writeContacts(contacts);
  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// Варіант з використанням бібліотеки yargs

// const fs = require("node:fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(__dirname, "db", "contacts.json");

// async function listContacts() {
//   const contacts = await fs.readFile(contactsPath, "utf-8");
//   return JSON.parse(contacts);
// }

// async function writeContacts(contacts) {
//   return await fs.writeFile(
//     contactsPath,
//     JSON.stringify(contacts, null, 2),
//     "utf-8"
//   );
// }

// async function getContactById(id) {
//   const contactId = String(id);
//   const contacts = await listContacts();
//   const contact = contacts.find((contact) => contact.id === contactId);
//   return contact || null;
// }

// async function removeContact(id) {
//   const contactId = String(id);
//   const contacts = await listContacts();
//   const contactIndex = contacts.findIndex(
//     (contact) => contact.id === contactId
//   );
//   if (contactIndex === -1) {
//     return null;
//   }
//   const removedContact = contacts.splice(contactIndex, 1);
//   await writeContacts(contacts);
//   return removedContact;
// }

// async function addContact(name, email, phone) {
//   const contacts = await listContacts();
//   const newContact = { name, email, phone, id: nanoid() };
//   contacts.push(newContact);
//   await writeContacts(contacts);
//   return newContact;
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
