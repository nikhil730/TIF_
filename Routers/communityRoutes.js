const express=require('express');
const router=express.Router();
const communityController=require('./../controllers/communityController')
const authMiddleware=require('./../middlewares/auth');

// To check that user is already logged in or not
router.use(authMiddleware.isAuthenticatedUser);
router.route('/').get(communityController.getAllCommunities).post(communityController.createNewCommunity);
router.route('/me/owner').get(communityController.getOwnedCommunities)
router.route("/:id/members").get(communityController.getAllMembersOfCommunity)
router.route('/me/member').get(communityController.getMyJoinedCommunity);


module.exports = router;