const express=require('express');
const router=express.Router();
const roleController=require('./../controllers/roleController')
const authMiddleware=require('./../middlewares/auth');



// To check that user is already logged in or not
router.use(authMiddleware.isAuthenticatedUser);
router.route('/').get(roleController.getAllRoles).post(roleController.createRole);





module.exports = router;