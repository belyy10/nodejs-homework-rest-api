const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/index");

const {
  createContact,
  getContacts,
  current,
  verifyMail,
  reconfirmMail,
} = require("../../controllers/user/user");

router.get("/contacts", auth, getContacts);

router.post("/contacts", auth, createContact);
router.get("/current", auth, current);
router.get("/verify/:verificationToken", verifyMail);
router.post("/verify", reconfirmMail);

module.exports = router;
