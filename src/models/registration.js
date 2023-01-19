const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    }, 
    batch : {
        type : String,
        required: true
    }, 
    section : {
        type : String,
        required: true
    },  
    roll : {
        type : String,
        required: true
    }, 
    email : {
        type : String,
        required: true,
        unique:true
    }, 
    phone : {
        type : String,
        required: true,
        unique:true
    }, 
    password : {
        type : String,
        required: true
    },
    
    userid: {
        type : String,
        unique : true
    },
    count: Number,
    
    eventName : {
        banner: Boolean,
        idea : Boolean,
        poster : Boolean,
        website : Boolean,
        olympiad : Boolean
   }
    
})
//create a collection
const Registration = new mongoose.model("userinfo", studentSchema);

module.exports = Registration;