const Contact = require("../../service/schemas/contacts");

async function getContacts(req, res, next) {
  const {
    limit = 20,
    page = 1,
    favorite = [true, false],
    search = "",
  } = req.query;
  const skip = (page - 1) * limit;

  return res.status(200).json(
    await Contact.find({ favorite, name: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(limit)
  );
}

module.exports = getContacts;
