const service = require("../../service/index");

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

module.exports = updateStatus;
