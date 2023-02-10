const { httpError } = require("../../utils/httpError/contacts");
const service = require("../../service/index");

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

module.exports = deleteContact;
