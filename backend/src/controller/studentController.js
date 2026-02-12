const User=require('../models/user');
const bcrypt = require('bcrypt' );
const generateToken=require('../utils/generateTocken');

// Controller function to create a new studentr
const registerStudent=async (req,res)=>{
    try{
        const {name,email,password,studentRegNo}=req.body;  
        const existingStudent=await User.findOne({email});  
        if(existingStudent){
            return res.status(400).json({message:"Student with this email already exists"});
        }
        if(!name || !email || !password || !studentRegNo){
            return res.status(400).json({message:"All fields are required"});
        }   
        const hashedPassword=await bcrypt.hash(password,10);
        const newStudent=new User({ 
            name,       
            email,
            password:hashedPassword,
            studentRegNo,
            role:"student"
        });
        await newStudent.save();
        res.status(201).json({message:"Student registered successfully"});
    }catch(error){
        console.error("Error registering student:",error.message);
        res.status(500).json({message:"Server error"});
    }
    
};

const loginStudent=async(req,res)=>{
    try{
        const {studentRegNo,password}=req.body;
        const student=await User.findOne({studentRegNo});
        if(!student){
            return res.status(400).json({message:"Student with this registration number does not exist"});
        }
        const isPasswordValid=await bcrypt.compare(password,student.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid student registration number or password"});
        }
        res.status(200).json({message:"Login successful",token:generateToken(student)});
    }catch(error){
        console.error("Error logging in student:",error.message);
        res.status(500).json({message:"Server error"});
    }
};
const getAll=async(req,res)=>{
    try{
        const students=await User.find();
        res.status(200).json({message:"Students fetched successfully",students});
    }catch(error){
       
        res.status(500).json({message:"Server error"});
        console.log(error)
    }
};

module.exports={registerStudent,loginStudent,getAll};

