const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('./catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../Schema/userSchema');
const Role = require('../Schema/roleSchema');
const Community = require('../Schema/communitySchema');
const Member = require('../Schema/memberSchema');




exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {
    const { token } = req.cookies


    if (!token) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }

    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = await User.findById(decoded.id);
    next()
})

exports.authorizeRole = (...roles) => {
    return catchAsync(async (req, res, next) => {
        let member;
        let roleOfTheMember
        if (req.body.community) {
            // Logic for checking for adding new member
            member = await Member.find({ community: req.body.community, user: req.user._id }).populate('role');
            if (member.length == 0) {
                return next(new ErrorHandler('You are not authorized to perform this task', 403))
            }
            roleOfTheMember = member[0].role.name;

        } else if (req.params.id) {
            // Logic for chechking for delete member 

            const communityMember = await Member.findById(req.params.id);
            const DataOfAdminPerson = await Member.find({ user: req.user._id, community: communityMember.community }).populate('role')
            roleOfTheMember = DataOfAdminPerson[0].role.name;
        } else {
            return next(new ErrorHandler('You are not authorized to perform this task', 403))
        }

        if (!roles.includes(roleOfTheMember)) {
            new next(new ErrorHandler(`You are not authorized to perform this task`, 403));
        }
        next()
    })
}