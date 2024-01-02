const mongoose = require('mongoose');
const validate = require('validator');

const memberSchema=mongoose.Schema({
    _id:{
        type:String,
        require:true
    },
    community:{
        type:String,
        ref:'Community',
        require:true
    },
    user:{
        type:String,
        ref:'User',
        require:true
    },
    role:{
        type:String,
        ref:'Role',
        require:true
    },
    created_at:{
        type:Date,
        default:Date.now
    },
})



const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
