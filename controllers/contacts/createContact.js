const service = require("../../service/index");

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

module.exports = createContact;
