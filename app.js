const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");


var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/contactmyOwn', {useNewUrlParser: true , useUnifiedTopology: true});


var PORT = process.env.PORT || 4000;


// Schema bna rhe hum 
var contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
var Contactmy = mongoose.model('Contactmy', contactSchema);

//! for serving static file
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//! set templates which is called views in nodejs
app.set("view engine", "hbs");
app.engine("html", require("hbs").__express);



app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.get("/about", (req, res) => {
  res.status(200).render("about");
});

app.get("/suggestion", (req, res) => {
  res.status(200).render("suggestion");
});

app.get("/contact", (req, res) => {
  res.status(200).render("contact");
});

app.post("/contact", (req, res) => {
  var myData = new Contactmy(req.body);
  myData.save().then(() => {
    res.status(200).render("contact")
  }).catch(()=>{
    res.status(404).send("Retry");
  })
});

app.get("*" , (req,res) => {
  res.status(404).render("erpage");
})

app.listen(PORT, () => {
  console.log(`Server run on ${PORT}`);
});