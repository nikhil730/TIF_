const express=require('express');
const router=express.Router();
const authController=require('./../controllers/authController')
const authMiddleware=require('./../middlewares/auth');

router.post('/signup',authController.registerUser);
router.post('/signin',authController.signin);
router.get('/logout',authController.logout)
router.get('/me',authMiddleware.isAuthenticatedUser,authController.getMyData);



module.exports = router;