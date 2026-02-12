const jwt=require('jsonwebtoken');

const generateToken=(student)=>{
   return jwt.sign({id:student._id,name:student.name,email:student.email},process.env.JWT_SECRET,{expiresIn:"1d"});
 };





module.exports = generateToken;


