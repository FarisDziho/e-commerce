const { Router } = require('express');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const bcrypt = require('bcrypt');
const verifyToken = require('../JWT');
require('dotenv').config();

const router = Router();

router.put('/', verifyToken,async(req,res)=>{
    const purchaseCost = req.body.purchaseCost;
    const user = jwt.verify(req.token, process.env.JWT_KEY);
    await User.findOne({where:{id:user.id}})
    .then((user)=> {
        user.update({balance:user.balance-purchaseCost})
    })
    // console.log(db);
    // .on('succes' , (user)=>{
    //     if(user){
    //         user.update({
    //             balance:balance-purchaseCost
    //         })
    //     }
    // })
    
})


module.exports = router;