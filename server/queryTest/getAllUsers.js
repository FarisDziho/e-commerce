const db = require('../../models');
const Sequelize = require('sequelize');
const { sequelize } = require('../../models');
const Op =sequelize.Op;
// const User = require('../../models/user');
// .then(items => items.map(item => console.log(item.dataValues)))
// console.log(db.User);
 const carts = db.Cart.findAll(
        {
            include:{
                model:db.Item, 
                right:true,
                required:true,
                
            }
            
        }
    )
 .then(carts => console.log(JSON.stringify(carts,null,2)))
//  console.log(Carts);
//  console.log(JSON.stringify(Carts,null,2));

// console.log("All users:", JSON.stringify(users, null, 2));
const getAllUsers = async (req,res) =>{

    // const users = await db.User.query("SELECT * FROM User");
    // const users = await User.findAll();
    
   
    
};

module.exports=getAllUsers;
