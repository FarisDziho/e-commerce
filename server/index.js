const expres = require('express');
// const morgan = require('morgan');
const helmet = require('helmet');
const { Sequelize } = require('sequelize');
const app = expres();
const getAllUsers = require('./queryTest/getAllUsers')

// app.use(morgan('common'));
// app.use(helmet())

// const testiraj=require('./models/test');

var sequelize = new Sequelize('ecommerce', 'postgres', 'hacker404', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    port:5432
  });

app.get('/' , async (req,res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    //   console.log(getAllUsers());
      
}) 

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