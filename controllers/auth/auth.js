const { User } = require("../../service/schemas/users");
const { httpError } = require("../../utils/httpError/contacts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res, next) {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      data: {
        user: {
          email,
          id: savedUser._id,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const storedUser = await User.findOne({
    email,
  });
  if (!storedUser) {
    throw new httpError(401, "email is not valid");
  }
  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    throw new httpError(401, "password is no valid");
  }
  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json({
    data: {
      token,
    },
  });
}

module.exports = { register, login };
