// const fs = require('fs/promises')
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const dbPath = path.join(__dirname, "contacts.json");

async function readDb() {
  try {
    const dbRaw = await fs.readFile(dbPath);
    const db = JSON.parse(dbRaw);
    return db;
  } catch (error) {
    console.log(error.message);
  }
}

async function writeDb(db) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(db, null, 4));
  } catch (error) {
    console.log(error.message);
  }
}

async function listContacts() {
  try {
    const db = await readDb();
    return db;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const db = await readDb();
    const findDb = db.find((contact) => contact.id === contactId);
    return findDb;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const db = await readDb();
    const updateDb = db.filter((contact) => contact.id !== contactId);
    await writeDb(updateDb);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const id = nanoid();
    const contact = { id, name, email, phone };
    const db = await readDb();
    db.push(contact);
    writeDb(db);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}
async function updateContact(contactId, body) {
  try {
    const { name, email, phone } = body;
    const db = await readDb();
    db.forEach((contact) => {
      if (contact.id === contactId) {
        contact.name = name;
        contact.phone = phone;
        contact.email = email;
      }
      writeDb(db);
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
