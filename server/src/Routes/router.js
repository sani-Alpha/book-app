'use strict';

const express = require('express');
const router = new express.Router();
const logger = require('../Services/logger');
const Logger = new logger('Router')
const path = require('path')
const publicRoot = path.join(__dirname, '../../');
const getConnection = require('../Services/dbScript');

let db;
getConnection.connectDB(async (error) => {
    if(error)
        Logger.error(error);
    db = await getConnection.getDB();
});

router.use(function timeLog(req, res, next) {
    Logger.info(req.url);
    next();
});

router.get('/', (req, res) => {
    res.status(200).sendFile('Client/index.html', {root: publicRoot}, (err) => {
        if(err) {
            Logger.error(err);
            res.status(500).send('Could not find the page requested');
        }
    });
});

router.post('/sendBook', function (req,res) {

    let bookData = {
        name: req.query.name,
        author: req.query.author,
        pages: req.query.pages,
        price: req.query.price,
        genre: req.query.genre
    };

    if(bookData.name == null || bookData.author == null || bookData.pages == null || bookData.price == null || bookData.genre == null) {
        Logger.warning('Data Missing');
        res.status(500).send('Data missing');
    }

    db.collection('books').insertOne(bookData, (error,result) => {
        if(error) {
            Logger.error(error);
            return res.status(500).send('Could not insert the book');
        }
        Logger.info('New Book inserted')
        res.status(200).send('Your books has been listed! Thank you!');
    });
});

router.get('/books',function (req,res) {
    db.collection('books').find({}).toArray((error,result) =>{
        if(error) {
            Logger.error(error);
            res.status(500).send('Could not complete the request');
        }
        Logger.info('Displayed data from database');
        res.status(200).send(result);
    });
});

module.exports = router;