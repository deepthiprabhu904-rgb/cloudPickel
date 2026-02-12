const bcrypt=require('bcrypt');

const User = require("./models/user");
const seedAdmin=async()=>
{
    try{
        const adminEmail="deepthiprabhu@gmail.com"
        const exsistingAdmin=await User.findOne({email:adminEmail});
        if(exsistingAdmin){
            console.log("admin user already exist");
            return ;
        }
        const hashedPassword = await bcrypt.hash("Admin@123", 10);
        const adminUser = new User({
            name: "Admin User",
            email: adminEmail,
            password: hashedPassword,
            studentRegisterNo: "ADMIN001",
            role: "admin"
        });
        await adminUser.save();
        console.log("Admin user created successfully");
    }
    catch (error) {
        console.error("Error creating admin user:", error);
    }
};
module.exports=seedAdmin;

