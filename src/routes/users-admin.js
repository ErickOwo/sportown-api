const express = require('express');
const router = express.Router();

const User = require('../models/User')

// essentials to authenticate
const bcrypt = require('bcrypt');

const { schemaRegisterUser } = require('../utils/schemas-joi')

router.post('/users', async (req, res)=>{
  try {
    const { error } = schemaRegisterUser.validate(req.body);
    if(error) return res.status(400).json({ error: error.details[0].message });

    const isEmailExist = await User.findOne({ email: req.body.email });
    if(isEmailExist) return res.status(400).json({ error: 'Email ya registrado' });

    const salt = await bcrypt.genSalt(11);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      member: false,
      lastMonthPayed: 'No indica',
      password,
    })

   user.save();

   return res.json({ error: null, message: "Usuario agregado correctamente"}); 
  
  } catch(error) {
    return res.status(400).json(error);
  } 
});


router.get('/users', async (req, res)=>{
  const users = await User.find();
  users.reverse();
  return res.json({data: users})
});

module.exports = router;