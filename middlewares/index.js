const { httpError } = require("../utils/httpError/contacts");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return httpError(400, error.message);
    }
    return next();
  };
}
module.exports = {
  validateBody,
};
