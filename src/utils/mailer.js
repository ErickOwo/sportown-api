//mnxzxltbxuezlgrr
//prueba del Mailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'e12antonio@gmail.com', // generated ethereal user
    pass: 'mnxzxltbxuezlgrr', // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log('Ready for send email');
})

const info = await transporter.sendMail({
  from: '"SportTown" <e12antonio@gmail.com>', // sender address
  to: "e13antonio@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<h1>Hello world?</h1>", // html body
});