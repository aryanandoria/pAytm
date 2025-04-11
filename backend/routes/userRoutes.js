const express = require('express');
const router = express.Router();
const { AuthMiddleware } = require("../Authmiddleware");
const { User } = require("../db");
const zod = require('zod');
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken');
const {Account} = require('../db');

const secret_key = '12345'
router.post('/register', async(req,res)=>{
    try{
        console.log("request recieved in register");
        
        const {firstname,lastname,email,password} = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existuser = await User.findOne({email});
        if(existuser){
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPass = await bcrypt.hash(password,10);
        const user  = await User.create({firstname,lastname,email,password:hashedPass});
        const userID = user._id;

        await Account.create({
            userId: user._id,
            balance:1+Math.random()*10000
        })

        return res.status(200).json({message: "user registered successfully"});
    }catch(error){
        console.error("Error creating user:", error); 
        return res.status(500).json({message: "There is some error in creating user", error: error.message });
    }
})

router.post('/login',async(req,res)=>{
    try{
        console.log("request recieved in login")
        const{email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "user not found"});
        }
    
        const checkpasss = await bcrypt.compare(password,user.password);
        if(!checkpasss){
            return res.status(400).json({message: "password is not  correct"});
        }
    
        const token = jwt.sign({id: user._id},secret_key, {
            expiresIn : '1d',
        })

        res.status(200).json({token,message:"user logged in"});
        console.log("user logged in");
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "there is some eror in login",error});
    }
})

const updateBody = zod.object({
	password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})
router.put("/change", AuthMiddleware, async (req, res) => {
    try{
        const { success } = updateBody.safeParse(req.body)
        if (!success) {
           return  res.status(411).json({
                message: "Error while updating information"
            })
        }
        const updateData = req.body;
        if(req.body.password){
            updateData.password = await bcrypt.hash(req.body.password,10);
        }
        await User.updateOne({ _id: req.userId }, { $set: updateData });
        
    
        return res.json({
            message: "Updated successfully"
        })
    }
    catch(error){
        return res.status()
    }
})

router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, "firstname lastname email _id"); 
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// router.get("/bulk", async (req, res) => {
//     const filter = req.query.filter || "";

//     const users = await User.find({
//         $or: [{
//             firstname: {
//                 "$regex": filter
//             }
//         }, {
//             lastname: {
//                 "$regex": filter
//             }
//         }]
//     })

//     res.json({
//         user: users.map(user => ({
//             username: user.email,
//             firstname: user.firstname,
//             lastname: user.lastname,
//             _id: user._id
//         }))
//     })
// })


router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                { firstname: { $regex: "^" + filter, $options: "i" } }, // ✅ Matches only names starting with filter
                { lastname: { $regex: "^" + filter, $options: "i" } }
            ]
        });

        // console.log("Users found:", users);

        res.json({
            users: users.map(user => ({
                username: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
 

module.exports = router;