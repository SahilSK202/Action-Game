

const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const ejs = require('ejs');
// const bodyParser = require('body-parser');
const express = require('express');
const app = express();


// app.use(bodyParser.urlencoded({extended : true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');


mongoose.connect('mongodb+srv://sahiluser:sahilpassword@cluster0.de2sm.mongodb.net/GameScore?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
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
  name: String,
  score: Number

};

const score = mongoose.model("score", scoreSchema);

let result = score.find({ 'score': { $exists: 1 } }, { 'name': 1, 'score': 1 }).sort({ 'score': -1 }).limit(5).lean();


app.use('/static', express.static('static'))

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/templates/index.html");
//   });


app.post("/", async (req, res) => {
  let newGameScore = new score({
    name: req.body.playername,
    score: parseInt(req.body.playerscore)
    
  });
  
  newGameScore.save();
  result = score.find({ 'score': { $exists: 1 } }, { 'name': 1, 'score': 1 }).sort({ 'score': -1 }).limit(5).lean();
  res.redirect("/");
  
  
});

app.get("/", async (req, res) => {

  // const result = await score.find({'score': {$exists: 1}}, {'name': 1,'score': 1}).sort({'score': -1}).limit(5).lean();
  // result = await score.find({}).lean();
  // score.find({} , function (err ,scores) {
  result = await score.find({ 'score': { $exists: 1 } }, { 'name': 1, 'score': 1 }).sort({ 'score': -1 }).limit(5).lean();

  res.render('index', {
    scoreList: result
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

