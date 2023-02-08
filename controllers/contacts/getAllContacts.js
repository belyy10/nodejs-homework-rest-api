const service = require("../../service/index");
const Contact = require("../../service/schemas/contacts");

async function getContacts(req, res, next) {
  const { limit = 20, page = 1, favorite = [true, false] } = req.quary;
  const skip = (page - 1) * limit;
  try {
    const contacts = await service.getAllContacts();
    return res
      .status(200)
      .json(await Contact.find({ favorite }).skip(skip).limit(limit));
  } catch (error) {
    error.message;
    next(error);
  }
}

module.exports = getContacts;
