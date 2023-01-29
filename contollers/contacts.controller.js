const { httpError } = require("../utils/httpError/contacts.js");
const service = require("../service/index");

async function getContacts(req, res, next) {
  try {
    const contacts = await service.getAllContacts();
    res.json({
      status: "success",
      code: 200,

      contacts,
    });
  } catch (error) {
    error.message;
    next(error);
  }
}

async function getContact(req, res, next) {
  try {
    const { id } = req.params;
    const contact = await service.getContactById(id);
    if (!contact) {
      return next(httpError(404, "Contact not found"));
    }
    return res.json({
      status: "success",
      code: 200,
      contact,
    });
  } catch (error) {
    error.message;
    next(error);
  }
}
async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  try {
    const newContact = await service.createContact({ name, email, phone });

    res.json({
      status: "success",
      code: 201,
      newContact,
    });
  } catch (error) {
    error.message;
    next(error);
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  try {
    const result = await service.getContactById(id);
    if (!result) {
      return next(httpError(400, "Contact not found"));
    }
    await service.removeContact(id);
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    console.error(e);
    next(e);
  }
}
async function changeContact(req, res, next) {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const contact = service.findById(id);
    if (!contact) {
      return res.status(404).json({
        code: 404,
        message: "Not found",
      });
    }

    await service.findByIdAndUpdate(id, { name, email, phone });
    res.json({
      status: "success",
      code: 200,
      message: "contact upgrade",
    });
  } catch (error) {
    error.message;
    next(error);
  }
}
async function updateStatus(req, res, next) {
  const { id } = req.params;
  const { favorite = false } = req.body;
  try {
    const contact = service.findById(id);
    if (!contact) {
      return res.status(404).json({
        code: 404,
        message: "Not found",
      });
    }

    await service.findByIdAndUpdate(id, { favorite });
    res.json({
      status: "success",
      code: 200,
      message: "contact upgrade",
    });
  } catch (error) {
    error.message;
    next(error);
  }
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  updateStatus,
};
