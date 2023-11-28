const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = mongoose.Schema(
  {
    displayName: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      required: [true, 'El nombre de usuario es requerido'],
      minlength: [3, 'El nombre de usuario no puede tener menos de 3 caracteres'],
      maxlength: [20, 'El nombre de usuario no puede tener más de 20 caracteres'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ['root', 'super', 'normal'],
        message: 'El valor de rol debe ser root, super o normal',
      },
    },
    refreshToken: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.__v;
      },
    },
  }
);

AdminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminSchema.methods.comparePassword = async function (passToCompare) {
  const isMatch = await bcrypt.compare(passToCompare, this.password);
  return isMatch;
};

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
