const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require("../models/Admin");

const { schemaRegisterAdmin } = require('../utils/schemas-joi');

router.post('/signup', async (req, res)=>{
  try {
    const { error } = schemaRegisterAdmin.validate(req.body);
    if(error) return res.status(400).json({ error: error.details[0].message });

    const isEmailExist = await Admin.findOne({ email: req.body.email });
    if(isEmailExist) return res.status(400).json({ error: 'Correo electrónico ya registrado' });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

     const user = new Admin({
       name: req.body.name,
       email: req.body.email,
       creator: req.body.creator,
       phone: req.body.phone,
       password,
     })

    user.save();

    return res.json({ error: null, message: "usuario agregado correctamente"});
  } catch(error) {
    return res.status(400).json(error);
  }
});

router.get('/user', async (req, res)=>{
  try{
    const token = req.header('Authorization');
    const decode = jwt.decode(token);
    const isEmailExist = await Admin.findOne({email: decode.email});
    if(isEmailExist) return res.send(decode);
    else throw('email no registrado');
  } catch(error){
    return res.status(400).send(error);
  }
});

module.exports = router;
