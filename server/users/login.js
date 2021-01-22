const { Router } = require('express');
const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const bcrypt = require ('bcrypt')

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
                  jwt.sign(user.dataValues, 'secretkey', (err, token) => {
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
   jwt.verify(req.token, 'secretkey', (err, user) => {
      if(err){
         res.send(err.message);
      }
      else{
         res.send(user);
      }
   });
});

function verifyToken(req, res, next) {
   const bearerHeader = req.headers['authorization'];
   if (bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
   } else {
      res.sendStatus(403);
   }
}

module.exports = router;
