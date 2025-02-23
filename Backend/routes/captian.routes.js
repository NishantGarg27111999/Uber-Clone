const express=require('express');
const router=express.Router();
const captainController=require('../controllers/captain.controller');
const {body}=require('express-validator');
const authMiddleware=require('../middlewares/auth.middleware')


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname should be atleast 3 character long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 character long'),
    body('vehicle.color').isLength({min:3}).withMessage("Vehicle color should be atleast 3 character long"),
    body('vehicle.plate').isLength({min:3}).withMessage("Vehicle number should be atleast 3 character long"),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Vehicle capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalide vehicle type')
],captainController.registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 character long')
],captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);
router.get('/logout',captainController.logoutCaptain);

module.exports=router;