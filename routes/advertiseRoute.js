const { AccessTokenValidation } = require('auth-middleware-jwt');
const { getAdvertise, addAdvertise, updateAdvertise, deleteAdvertise } = require('../controllers/VendorController/advertisement');
const { hasPermission } = require('../middleware/checkUser');
const router = require('express').Router();


/*
##### @Description: Add/update/get/delete campaign
##### Route: /api/v1/advertise?_id=
##### Method: GET/POST/PUT/DELETE
##### Access: superAdmin
*/
router
    .route('/')
    .get(AccessTokenValidation, hasPermission(['superAdmin']), getAdvertise)
    .post(AccessTokenValidation, hasPermission(['superAdmin']), addAdvertise)
    .put(AccessTokenValidation, hasPermission(['superAdmin']), updateAdvertise)
    .delete(AccessTokenValidation, hasPermission(['superAdmin']), deleteAdvertise);

module.exports = router