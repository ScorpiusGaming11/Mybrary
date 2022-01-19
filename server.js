// check to see if code is ran on production env //
if (process.env.NODE_ENV !== "production") {

    require('dotenv').config();

}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

// set view engine //
app.set("view engine", "ejs");

// set views location //
app.set("views", __dirname + "/views");

// set up express layouts file //
app.set("layout", "layouts/layout");
app.use(expressLayouts);

// set public/static files location //
app.use(express.static("public"));

// set up port //
app.listen(process.env.PORT || 3000);

// first app route (home page) //
app.use("/", indexRouter);

// connect to database //
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to Mongoose"));