const mongoose = require('mongoose');
const validate = require('validator');

const communitySchema=mongoose.Schema({
    _id:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:[true,'Please provide a proper name to a community'],
        minlength: [2, 'minimum length of role name is 2 '],
    },
    slug:{
        type:String,
        require:[true,'Please provide a proper name to a community'],
        minlength: [2, 'minimum length of role name is 2 '],
        unique:[true,"Slug must be a unique identity"]
    },
    owner:{
        type:String,
        ref:'User'
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    },

})





const Community = mongoose.model('Community', communitySchema);
module.exports = Community;
    