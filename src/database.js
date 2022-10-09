const mongoose = require("mongoose");

//const MONGODB_URI = process.env.MONGODB_URI;

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;
//MONGODB_URI = mongodb://localhost/notes-app

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }) /* useCreateIndex: true */
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.log(err));
//parece que ahora ya no es necesario el 2do argumento del connect
