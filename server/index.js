const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mde5k.mongodb.net/doctorsDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});








client.connect(err => {
  const appoinmentCollection = client.db("doctorsDatabase").collection("appoinment");

    


    app.post('/addAppoinment',(req, res)=>{
      const appoinment = req.body;
      appoinmentCollection.insertOne(appoinment)
      .then(result => {
        res.send(result.insertedCount>0)
      })
    })
    app.post('/appoinmentByDate',(req, res)=>{
      const date = req.body.appoinmentDate;

      appoinmentCollection.find({date: date})
      .toArray((err , documents)=>{
        res.send(documents)
      })
     
    })




});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen( process.env.port ||port)