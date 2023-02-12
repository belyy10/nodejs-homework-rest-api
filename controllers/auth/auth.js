const { User } = require("../../service/schemas/users");
const { httpError } = require("../../utils/httpError/contacts");
const sendMail = require("../../utils/index");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

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
    const verificationToken = v4();
    const avatar = gravatar.url(email, { s: "100", r: "x", d: "retro" });
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatar,
      verify: false,
      verificationToken,
    });

    await sendMail({
      to: email,
      subject: "please confirm your email",
      html: `<a href="localhost:3000/api/users/verify/${verificationToken}">Confirm email</a> `,
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
    throw new httpError(401, "Email is not valid");
  }
  if (!storedUser.verify) {
    throw new httpError(401, "Email is not verified. Please check your mail");
  }
  const isPasswordValid = await bcrypt.compare(password, storedUser.password);
  if (!isPasswordValid) {
    throw new httpError(401, "Password is no valid");
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
