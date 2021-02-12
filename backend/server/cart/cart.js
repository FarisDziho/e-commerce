const { Cart } = require('../../models');
const { Router } = require('express');
const verifyToken = require('../JWT');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = Router();

router.post('/',verifyToken,async (req,res) =>{
    console.log(req.body);
    const user = jwt.verify(req.token, process.env.JWT_KEY);
    var item = JSON.stringify(req.body);
    const cart =await Cart.findOne({
        where:{UserId:user.id}
    })
    if(cart)
    {
        cart.items+=item;
        await cart.save();
        console.log(cart);
    }
    else
    {
        const cartItem =await Cart.create({UserId:user.id,items:item});
    }
    // console.log(cartItem);
    res.json({message:"uspjesno dodan item"});

})

router.get('/',verifyToken,async (req,res) =>{
    const user = jwt.verify(req.token, process.env.JWT_KEY);
    const cart = await Cart.findOne({
        attributes: ['items'],
        where:{
            UserId:user.id
        }
    });
    const itemStrigify = JSON.stringify(cart.dataValues.items)
    console.log(itemStrigify)
    
    const item = JSON.parse(itemStrigify);
    console.log(item);
})

module.exports=router;