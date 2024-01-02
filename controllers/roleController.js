const Role=require('../Schema/roleSchema');
const ErrorHandler=require('../utils/errorHandler');
const catchAsync=require('../middlewares/catchAsync');
const APIFeatures=require('../utils/apiFeatures');
const jwt=require('jsonwebtoken');
const {Snowflake} =require("@theinternetfolks/snowflake");
const paginationFunction=require('./../utils/pagination')

// create new role
exports.createRole = catchAsync(async(req,res,next)=>{
    const role=await Role.create({
        _id:Snowflake.generate(),
        name:req.body.name,
        
    })

    res.status(200).json({
        status:true,
        content:{
            data:role
        }
    })
})



// to get all roles 
exports.getAllRoles=catchAsync(async(req,res,next)=>{
    const totalRoles=await Role.countDocuments();
    paginationFunction(req.query,res,next,totalRoles,Role.find())

})

