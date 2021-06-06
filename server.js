

const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// app.use(bodyParser.urlencoded({extended : true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


mongoose.connect('mongodb+srv://sahiluser:sahilpassword@cluster0.de2sm.mongodb.net/GameScore' ,{ useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true });
// const connectDB = async() =>{
//   return mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true } , err =>{
//     if (err){
//       console.log("Connection to DB failed !");
//     }
//     else{
//       console.log("Connected to DB , YO !");
//     }
//   });
// }
// const db = mongoose.connection;
// db.on("error" , console.error.bind(console , "MongoDB connection error"));

// database schema

const scoreSchema = {
    name:  String,
    score: Number
    
};

const score = mongoose.model("score" , scoreSchema);




app.use('/static', express.static('static'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/templates/index.html");
  });

app.post("/" , (req , res) =>{
  let newGameScore = new score({
    name : req.body.playername,
    score : parseInt(req.body.playerscore)

  });
  newGameScore.save();
  res.redirect("/");
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

