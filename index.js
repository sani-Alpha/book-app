const express = require('express');
const bodyParser = require('body-parser');
const mongoclient = require('mongodb').MongoClient; 
const env = require('dotenv').config();
const objectid = require('mongodb').ObjectID;

const app = express();
app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let database,collection;

app.post('/books',(req,res) => {
    collection.insertOne(req.query, (error,result) => {
        if(error)
            return res.status(500).send(error);
        res.status(200).send('Your books has been listed! Thank you!');
    });
});

app.get('/books', function(req,res) {
    collection.find({}).toArray((error,result) =>{
        if(error)
            return res.status(500).send(error); 
        res.status(200).send(result);
    });
});

app.listen(process.env.PORT || 3000, ()=>{
    mongoclient.connect(process.env.DB_URL||'mongodb://localhost/my_books', {useUnifiedTopology: true}, (error,client) => {
        if(error)
            throw error;
        database = client.db('my_books');
        collection = database.collection('library');
        console.log('connected to my_books');
    });    
});