const { httpError } = require("../../utils/httpError/contacts");
const service = require("../../service/index");

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

module.exports = getContact;
