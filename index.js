require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const mongoose = require("mongoose");
const routerApi = require("./src/routes");
const { logErrors, errorHandler, boomErrorHandler } = require('./src/handlers/errors.handler')
const app = express();

app.listen(port, () => console.log("Active port", port));

mongoose
  .connect(process.env.CONNEXTION_STRING_MONGODB)
  .then(() => console.log("Succes Connection With Mongo"))
  .catch((err) => console.error(err));

app.use(express.json());
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


