const Contact = require("./schemas/contacts");

const getContactById = (id) => {
  return Contact.findById({ _id: id });
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
