const { Router } = require('express');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const bcrypt = require ('bcrypt')
const verifyToken = require('../JWT');
require('dotenv').config();

const router = Router();

router.post('/', async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await User.findOne({
         where: { email: email},
      });
      if(user)
         {     
               
               const validPassword = await bcrypt.compare(password,user.password);
               if(validPassword)
               {
                  jwt.sign(user.dataValues, process.env.JWT_KEY, (err, token) => {
                     if (err) {
                        res.sendStatus(403);
                     } else {
                        res.json({token:token});
                     }
                  });
               }
               else{
                  res.json({ error: 'invalid password'});
               }
         }
      else{
          res.json({ error: 'user does not exist' });
      }
   } catch(err) {
      res.json({error:'internal error'});
   }
});
router.get('/', verifyToken, (req, res) => {
   jwt.verify(req.token, process.env.JWT_KEY, (err, user) => {
      if (err) {
         res.send(err.message);
      } else {
         res.send(user);
      }
   });
});


module.exports = router;
