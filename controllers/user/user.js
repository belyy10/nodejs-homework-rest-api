const { User } = require("../../service/schemas/users");
const httpError = require("../../utils/httpError/contacts");
const sendMail = require("../../utils/index");

async function createContact(req, res, next) {
  const { user } = req;
  const { id: contactId } = req.body;
  user.contacts.push(contactId);
  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  });
  return res.status(201).json({
    data: {
      contacts: updatedUser.contacts,
    },
  });
}

async function getContacts(req, res, next) {
  const { user } = req;
  const userWithContacts = await User.findById(user._id).populate("contacts", {
    email: 1,
    name: 1,
    _id: 1,
  });
  return res.status(200).json({
    data: {
      contacts: userWithContacts.contacts,
    },
  });
}
async function current(req, res, next) {
  const { user } = req;
  const { email, _id: id } = user;
  return res.status(200).json({
    data: {
      user: {
        email,
        id,
      },
    },
  });
}

async function verifyMail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken: verificationToken });
  if (!user) {
    throw httpError(400, "Verify token is not valid");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  return res.json({
    message: "success",
  });
}
async function reconfirmMail(req, res, next) {
  try {
    const { email } = req.body;
    const user = User.findOne({ email });
    if (user.verify) {
      throw httpError(400, "Verification has already been passed");
    }
    if (user) {
      await sendMail({
        to: email,
        subject: "please confirm your email",
        html: `<a href="localhost:3000/api/users/verify/${user.verificationToken}">Confirm email</a> `,
      });
    }
    return res.status(201).json({ message: "Verification send" });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  createContact,
  getContacts,
  current,
  verifyMail,
  reconfirmMail,
};
