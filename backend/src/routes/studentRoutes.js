const express=require('express');
const { registerStudent, loginStudent, getAll } = require('../controller/studentController');
const User=require('../models/user');
const protect=require('../middleware/protect');

const router=express.Router();
router.post('/register',registerStudent);
router.post('/login',loginStudent);
router.get('/getall',protect,getAll);

module.exports=router;