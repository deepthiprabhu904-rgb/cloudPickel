const mangoose = require('mongoose');

const userSchema = new mangoose.Schema(
    {
        name:{type:String},
        email:{type:String, unique:true},
        password:{type:String},
        studentRegNo:{type:String,unique:true,sparse:true},
        role:{type:String,enum:["admin","student",],default:"student"}
    }
);
module.exports=mangoose.model("user",userSchema);
