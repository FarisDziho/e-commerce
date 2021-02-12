const { Router } = require('express');
const { User } = require('../../models');
const bcrypt = require('bcrypt')
const router= Router();

router.post('/' , async (req,res) => {
    const {name,email} = req.body;
    console.log("test");
    try{
        const salt = await bcrypt.genSalt(10);
        password=await bcrypt.hash(req.body.password,salt);
        const user = await User.create({name,email,password})
        res.json(user);
    }
    catch(err){
        res.json({error:'email already in use'});
    }
})


module.exports=router;