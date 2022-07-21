const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const login = require('./src/routes/login');

// import auth routes
const auth = require('./src/routes/auth');
const validateToken = require('./src/routes/validate-token');

// import public routes
const usersPublic = require('./src/routes/users-public')

// import admin routes
const usersAdmin = require('./src/routes/users-admin')

require('dotenv').config();

const app = express();

app.set('port', 3005);

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.dr3tw5d.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,{useNewUrlParser: true}).then(()=>{
  console.log('base de datos conectada')
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//login route
app.use('/api', login);

//auth routes
app.use('/api/auth/', validateToken, auth);

//public routes
app.use('/api/public', usersPublic);

//admin routes
app.use('/api/admin', validateToken, usersAdmin);

app.listen(app.get('port'), ()=>{
  console.log(`Servidor escuchando en el puerto: ${app.get('port')}`)
});


