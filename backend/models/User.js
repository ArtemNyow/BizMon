const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String }, 
    googleId: { type: String }, 
    avatar: { type: String },   
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    verificationCode: { type: String },
codeExpires: { type: Date },

  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
