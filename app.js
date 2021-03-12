const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");


var mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost:27017/contactmyOwn', {useNewUrlParser: true , useUnifiedTopology: true});


var env = process.env.PORT || 4000;


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

app.set('view engine' , 'ejs')//set the template engine as html of ejs

app.set('views' , __dirname + '/views')//set the views directory   this line is not compulsory for the html file serving isko hta bhi skte ho tbhi render hoga
app.engine('html', require('ejs').renderFile);//render the file



app.get("/", (req, res) => {
  res.status(200).render("index.html");
});

app.get("/about", (req, res) => {
  res.status(200).render("about.html");
});

app.get("/suggestion", (req, res) => {
  res.status(200).render("suggestion.html");
});

app.get("/contact", (req, res) => {
  res.status(200).render("contact.html");
});

app.post("/contact", (req, res) => {
  var myData = new Contactmy(req.body);
  myData.save().then(() => {
    res.status(200).render("contact.html")
  }).catch(()=>{
    res.status(404).send("Retry");
  })
});

app.get("*" , (req,res) => {
  res.status(404).render("erpage");
})

app.listen(env, () => {
  console.log(`Server run on ${env}`);
});