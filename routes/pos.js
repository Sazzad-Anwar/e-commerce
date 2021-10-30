const { AccessTokenValidation } = require('auth-middleware-jwt');
const { hasPermission } = require('../middleware/checkUser');
const { deletePos, addPos, updatePos, getPos } = require('../controllers/VendorController/pos')
const router = require('express').Router();


/*
##### @Description: Add/update/get POS
##### Route: /api/v1/pos
##### Method: GET/POST/PUT
##### Access: superAdmin, admin
*/
router
    .route('/')
    .get(AccessTokenValidation, hasPermission(['superAdmin', 'admin']), getPos)
    .post(AccessTokenValidation, hasPermission(['superAdmin', 'admin']), addPos)
    .put(AccessTokenValidation, hasPermission(['superAdmin', 'admin']), updatePos)
    .delete(AccessTokenValidation, hasPermission(['superAdmin', 'admin']), deletePos)


module.exports = router;