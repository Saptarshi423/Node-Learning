const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: 'Handling get req'
    })
});

router.post('/', (req,res,next)=>{
    //create an instance of product model
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    
    // save the instance
    product.save();
    res.status(200).json({
        message: 'Handling post req',
        product: product
    })
});

router.get('/:productId', (req,res,next)=>{
    res.status(200).json({
        message: 'product details',
        orderId: req.params.orderId
    })
})

router.delete('/:productId', (req,res,next)=>{
    res.status(200).json({
        message: 'product deleted',
        orderId: req.params.orderId
    })
})

module.exports = router; 

