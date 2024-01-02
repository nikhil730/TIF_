const Community = require('../Schema/communitySchema');
const catchAsync = require('../middlewares/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const { Snowflake } = require("@theinternetfolks/snowflake");
const Member = require('./../Schema/memberSchema');

const paginationFunction = require('./../utils/pagination');
const Role = require('../Schema/roleSchema');
// create new community
exports.createNewCommunity = catchAsync(async (req, res, next) => {
    const name = req.body.name;

    // create slug
    const slug = name.toString()
        .trim()
        .toLowerCase()
        .replace(/[\s\W-]+/g, '-');

    const community = await new Community({ _id: Snowflake.generate(), name: name, slug: slug, owner: req.user._id }).save();

    // CREATING OWNER TO COMMUNITY MEMBER

    // fetching role id of community member
    const roleId = await Role.find({ name: 'Community Admin' });
    const member = await Member.create({
        _id: Snowflake.generate(),
        user: req.user._id,
        community: community._id,
        role: roleId[0]._id
    })


    res.status(200).json({
        status: true,
        content: {
            data: community
        }
    })
})



// get all communities 
exports.getAllCommunities = catchAsync(async (req, res, next) => {
    const totalCount = await Community.countDocuments();
    await paginationFunction(req.query, res, next, totalCount, Community.find().populate('owner', '_id name'))
})



// get owned communities 
exports.getOwnedCommunities = catchAsync(async (req, res, next) => {
    const totalCount = await Community.countDocuments({ owner: req.user._id });
    await paginationFunction(req.query, res, next, totalCount, Community.find({ owner: req.user._id }))
})


// get All members of single community 
exports.getAllMembersOfCommunity = catchAsync(async (req, res, next) => {
    const communityId = await Community.find({ slug: req.params.id });
    const totalCount = await Member.countDocuments({ community: communityId[0]._id });
    await paginationFunction(req.query, res, next, totalCount, Member.find({ community: communityId[0]._id }).populate('user', '_id name').populate('role', '_id name'))
})


exports.getMyJoinedCommunity = catchAsync(async (req, res, next) => {
    const totalCommunities = await Member.countDocuments({ user: req.user._id })

    const Communitydata = await paginationFunction(req.query, res, next, totalCommunities, Member.find({ user: req.user._id }).populate({
        path: 'community',
        // deep level population 
        populate: {
            path: 'owner',
            select: 'id name'
        }
    }).select({ _id: false, community: true }), true)

    console.log(Communitydata)


    // TO JUST FORMATE THE DATA SO WE DONT HAVE TO WRITE ANOTHER QUERY TO FETCH DATA OF COMMUNITY
    const finalCommunitiesArray = Communitydata.data.map(community => community.community);



    res.status(200).json({
        status: true,
        content: {
            meta: {
                total: Communitydata.totalCount,
                pages: Communitydata.totalPages,
                page: Communitydata.currentPage
            },
            data: finalCommunitiesArray
        }
    })
})