const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: 'Handling get req'
    })
});

router.post('/', (req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    };
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

