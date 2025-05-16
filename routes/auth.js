const express = require('express');
const router = express.Router();

const{check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const path = require('path');
//signup route

router.post(

    '/signup',
    [
        check('name','Name is required').notEmpty(),
        check('email','Please include a valid email').isEmail(),
        check('mobile_number','Mobile number is required').notEmpty(),
        check('gender','Gender must be Male, Female, or Other').isIn(['Male','Female','Other']),
        check(
            'password',
            'Password must be atleast 8 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character'
        ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
        check('confirm_password','Confirm Password field must match password').custom((value,{req})=>value ===req.body.password),

    ],
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const {name,email,mobile_number,gender,password} = req.body;

        try{
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({errors: [{msg: 'Email already registered'}]});
            }

            user = new User({
                name,
                email,
                mobile_number,
                gender,
                password,
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);
            await user.save();

            res.status(201).json({msg: 'User registered successfully'});
        }catch(err){
            console.log(err.message);
            res.status(500).send('Server error');
            
        }
    }
);

router.post(
    '/signin',
    [
        check('email','Please include a valid email').isEmail(),
        check('password','Password is required').exists(),
    ],
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }

        const {email,password} = req.body;

        try{
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({errors : [{msg : 'Invalid credentials'}]});
            }

            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({errors : [{msg:'Invalid credentials'}]});
            }
            return res.status(200).sendFile(path.join(__dirname,'../public/dashboard.html'));
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
module.exports = router;