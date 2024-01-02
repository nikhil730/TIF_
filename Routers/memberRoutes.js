const express=require('express');
const router=express.Router();
const memberController=require('./../controllers/memberController')
const authMiddleware=require('./../middlewares/auth');


router.use(authMiddleware.isAuthenticatedUser);

router.route('/').post(authMiddleware.authorizeRole('Community Admin'),memberController.addMember)
router.route('/:id').delete(authMiddleware.authorizeRole('Community Admin','Community Moderator'),memberController.deleteMember);



module.exports=router