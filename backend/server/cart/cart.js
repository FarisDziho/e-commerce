const { Cart } = require('../../models');
const { Router } = require('express');
const verifyToken = require('../JWT');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = Router();

router.post('/',verifyToken,async (req,res) =>{    
    const user = jwt.verify(req.token, process.env.JWT_KEY);
    const { cartItems, purchaseCost, datePurchased } = req.body;
    const cartItem = await Cart.create({
       UserId: user.id,
       items: JSON.stringify(cartItems),
       purchaseCost: purchaseCost,
       datePurchased: datePurchased
    });
    res.json({message:"kupovina uspjesno obavljena"})

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
router.post('/purchase', verifyToken, async(req,res)=>{
    const user = jwt.verify(req.token, process.env.JWT_KEY);
    console.log(user.balance);
    console.log(req.body.purchaseCost);
    res.json({message:"hello"});
})

module.exports=router;