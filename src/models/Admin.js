const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const AdminSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese su nombre.'],
  },
  creator: {
    type: String,
    required: [true, 'Por favor ingrese el nombre del creador.'],
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);