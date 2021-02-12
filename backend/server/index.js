const expres = require('express');
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser');
const cors=require('cors')
const login=require('./users/login');
const register=require('./users/register')
const paginate=require('./items/paginate')
const cart = require('./cart/cart')
require('dotenv').config();

const app = expres();
app.use(cors());


var sequelize = new Sequelize('ecommerce', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    port:5432
  });



app.use(bodyParser.json());

app.get('/' , async (req,res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    //   console.log(getAllUsers());
}) 

app.use('/users/login',login)
app.use('/users/register', register)
app.use('/items/paginate', paginate);
app.use('/user/cart', cart);
app.use((req,res,next) => {
    const error=new Error("not found");
    res.status(404);
    next(error);
})

app.use((error,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json(
        {
            error:error.message
        }
    )
})

app.listen(5000 , () => {
    console.log("listening at port: http://localhost:5000");
})