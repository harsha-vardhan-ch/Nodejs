const express = require('express');
const bodyParser = require('body-parser');

//Modified code for front-end and backend connection
const mongoose = require('mongoose');
const Promotions= require('../models/promotions');
const promoRouter = express.Router();

promoRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Promotions');
})
.delete((req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

promoRouter.route('/:promoID')
.get((req,res,next)=>{
    Promotions.findById(req.params.promoID)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) =>{
    Promotions.findByIdAndUpdate(req.params.promoID, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /Promotions/'+ req.params.promoID);
})
.delete((req,res,next) =>{
    Promotions.findByIdAndRemove(req.params.promoID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = promoRouter;