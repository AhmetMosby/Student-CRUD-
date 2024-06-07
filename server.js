
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const studentRouter = require('./router/StudentRouter');

mongoose.connect("mongodb+srv://ahmettulgay:ahmettulgay@studentmodel.ikfijhr.mongodb.net/?retryWrites=true&w=majority&appName=StudentModel")
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err)) 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/students', studentRouter);

app.use(cors({
    origin : "*"
  }))
  
  app.listen(9999,()=>{
    console.log('Merhaba Ben 9999 Portunda Çalıştım')
  })