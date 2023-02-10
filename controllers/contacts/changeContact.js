const service = require("../../service/index");

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

module.exports = changeContact;
