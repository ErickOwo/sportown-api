const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/Admin');

const { schemaLoginAdmin } = require('../utils/schemas-joi')

router.post('/login', async (req, res)=>{
  try{
    const { error } = schemaLoginAdmin.validate(req.body);
    if(error) return res.status(400).json({ error: error.details[0].message });
    
    const user = await Admin.findOne({ email: req.body.email });
    if(!user) return res.status(400).json({ error: 'Usuario o contraseña incorrecto' });
  
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
  
    if(!validatePassword) return res.status(400).json({ error: 'Usuario o contraseña incorrecto' });
  
    const access_token = jwt.sign({
      name: user.name,
      email: user.email,
      id: user._id,
    }, process.env.TOKEN_SECRET);
  
    return res.header('auth-token', access_token).json({ 
      error: null, 
      message: "Bienvenido", 
      access_token });
  } catch(error){
    return res.status(400).json(error);
  }
})


module.exports = router;