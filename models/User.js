const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  firstName: String,
  lastName: String
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
