const mongoose = require('mongoose');
const validate = require('validator');



const RoleSchema = mongoose.Schema({
    _id:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:[true,'Please provide a proper name to a role'],
        minlength: [2, 'minimum length of role name is 2 '],
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





const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;
    