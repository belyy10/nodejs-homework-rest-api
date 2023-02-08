const express = require("express");
const { register, login } = require("../../controllers/auth/auth");
const { tryCatchWrapper } = require("../../utils/httpError/contacts");

const authRouter = express.Router();

authRouter.post("/singup", tryCatchWrapper(register));
authRouter.post("/login", tryCatchWrapper(login));

module.exports = authRouter;
