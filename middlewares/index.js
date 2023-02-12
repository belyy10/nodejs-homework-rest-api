const { httpError } = require("../utils/httpError/contacts");
const jwt = require("jsonwebtoken");
const { User } = require("../service/schemas/users");
const multer = require("multer");
const path = require("path");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return httpError(400, error.message);
    }
    return next();
  };
}

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") {
    throw httpError(401, "token type is not valid");
  }
  if (!token) {
    throw httpError(401, "not token provided");
  }
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw httpError(401, "jwt token is not valid");
    }
    throw error;
  }
  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = {
  validateBody,
  auth,
  upload,
};
