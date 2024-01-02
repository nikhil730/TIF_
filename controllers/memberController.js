const Member = require('../Schema/memberSchema');
const Role = require('../Schema/roleSchema');
const User = require('../Schema/userSchema');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../middlewares/catchAsync');
const jwt = require('jsonwebtoken');
const { Snowflake } = require("@theinternetfolks/snowflake");


exports.addMember = catchAsync(async (req, res, next) => {
    const role = await Role.findById(req.body.role);
    const user = await User.findById(req.body.user);
    if (!user || !role) {
        return next(new ErrorHandler('Please enter valid data about member'), 500)
    }
    const member = await Member.create({
        _id: Snowflake.generate(),
        community: req.body.community,
        user: req.body.user,
        role: req.body.role
    });

    res.status(200).json({
        status: true,
        content: {
            data: member
        }
    })
})


exports.deleteMember = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const deleteMember = await Member.findByIdAndDelete(id);

    res.status(200).json({
        status: true
    })

})