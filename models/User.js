const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    mobile_number:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User',userSchema);