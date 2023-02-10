const path = require("path");
const fs = require("fs/promises");
const Contact = require("../../service/schemas/contacts");

async function uploadAvatar(req, res, next) {
  const { filename } = req.file;
  const tmpPath = path.resolve(__dirname, "../../tmp", filename);
  const publicPath = path.resolve(__dirname, "../../public/avatars", filename);
  try {
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
  const contactId = req.params.id;
  //   const contact = Contact.findByIdAndUpdate(
  //     contactId,
  //     {
  //       image: publicPath,
  //     },
  //     { new: true }
  //   );
  const contact = await Contact.findById(contactId);
  contact.avatar = publicPath;
  await contact.save();

  return res.json({
    data: {
      avatar: contact.avatar,
    },
  });
}

module.exports = uploadAvatar;
