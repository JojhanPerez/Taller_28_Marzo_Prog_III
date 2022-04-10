require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail")
const routerApi = require("./src/routes");
const { logErrors, errorHandler, boomErrorHandler } = require('./src/handlers/errors.handler')
const app = express();

app.listen(port, () => console.log("Active port", port));
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSID, authToken);

twilioClient.messages
  .create({
    body: "Prueba desde la app del uso de twilio",
    from: "+18645287751",
    to: "+573122649994",
  })
  .then((message) => console.log(`Mensaje enviado ${message.sid}`));

const email = require("./src/emailSendGrid/emailSendGrid");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/email/confirmation", async (req, res, next) => {
  try {
    res.json(await email.sendOrderSerie(req.body));
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

mongoose
  .connect(process.env.CONNEXTION_STRING_MONGODB)
  .then(() => console.log("Succes Connection With Mongo"))
  .catch((err) => console.error(err));

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


