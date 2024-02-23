const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      ref: `Blog`,
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model(`User`, userSchema);
