const express = require('express')
const router = express.Router();
const User = require('../model/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');//library for storing password's hash instead of password into database
const JWT_SECRET='Anusha_is_so_sweet'//to make sure no one has tempered with password
const jwt=require('jsonwebtoken');//library for returning a session token to user
const fetchuser=require('../middleware/fetchuser');

//Route 1
router.post('/createUser', [
    body('email','Enter a valid name').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {//post because of data like password
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    //check wheather user with same email exists
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success,error:"Email already exists"})
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    user=await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      }) 
    const data={
        user:{
            id:user.id
        }
    }//session token will use id as credentials
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true
    res.json({success,authtoken});
})

//Route 2
router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists()
],async(req,res)=>{
    const errors = validationResult(req);
    let success=false
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success,error:"Enter correct credentials"});
        }
        const comparepass=await bcrypt.compare(password,user.password);
        if(!comparepass){
            
            return res.status(400).json({success,error:"Enter correct credentials"});
        }
        //returning the session token
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});

    }catch(error){
        
        console.error(error.message);
        res.status(400).send("some error occured");
    }
})

//Route 3
/*we will use a middleware that will execute before async funtion and will update req and res and will help to get details by updated req
*/
router.post('/getuser',fetchuser, async(req,res)=>{
    try{
        const userID=req.user.id;
        const user=await User.findById(userID).select("-password");
        res.send(user);
    }catch(error){
        console.error(error.message);
        res.status(400).send("some error occured");
    }
})

module.exports = router;