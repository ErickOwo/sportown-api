const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese su nombre.'],
  },
  email: {
    type: String,
    required: [true, 'Por favor ingrese un email valido.'],
  },
  phone: {
    type: Number,
    required: [true, 'Por favor ingrese su número telefónico.'],
  },
  password: {
    type: String,
    required: [true, 'Ingrese una contraseña valida'],
  },
  member: {
    type: Boolean,
  },
  lastMonthPayed: {
    type: String,
  }, 
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);