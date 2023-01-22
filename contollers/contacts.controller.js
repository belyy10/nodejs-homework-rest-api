const db = require("../models/contacts.js");
const { httpError } = require("../utils/httpError/contacts.js");
const Joi = required("joi");

async function getContacts(req, res, next) {
  const contacts = await db.listContacts();
  res.json({
    status: "success",
    code: 200,
    contacts,
  });
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return next(httpError(404, "Contact not found"));
  }
  return res.json({
    status: "success",
    code: 200,
    contact,
  });
}
async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  const newContact = await db.addContact({ name, email, phone });

  res.json({
    status: "success",
    code: 201,
    newContact,
  });
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return next(httpError(400, "Contact not found"));
  }
  await db.removeContact(contactId);
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
}
async function changeContact(req, res, next) {
  const { contactId } = req.params;
  const { body } = req.body;
  const contact = db.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({
      code: 404,
      message: "Not found",
    });
  }

  await db.updateContact(contactId, body);
  res.json({
    status: "success",
    code: 200,
    message: "contact upgrade",
  });
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
};
