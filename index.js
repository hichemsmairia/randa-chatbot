const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./server/routes/users");

const config = require("./server/config/keys");
// const mongoose = require("mongoose");
// mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./server/config/passport")(passport);
// Routes
app.use("/api/users", users);

app.use('/api/dialogflow', require('./server/routes/dialogflow'));


//database connection 
mongoose
  .connect(
    "mongodb+srv://randa:randa@cluster0.wfknd.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
