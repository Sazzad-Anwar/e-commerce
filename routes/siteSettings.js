const { AccessTokenValidation } = require('auth-middleware-jwt');
const { addSiteSettings, getSiteSettings, updateSiteSettings } = require('../controllers/VendorController/siteSettings');
const { hasPermission } = require('../middleware/checkUser');
const router = require('express').Router();


/*
##### @Description: Add/update/get site Settings
##### Route: /api/v1/site-settings?_id=
##### Method: GET/POST/PUT
##### Access: superAdmin
*/
router
    .route('/')
    .get(AccessTokenValidation, hasPermission(['superAdmin']), getSiteSettings)
    .post(AccessTokenValidation, hasPermission(['superAdmin']), addSiteSettings)
    .put(AccessTokenValidation, hasPermission(['superAdmin']), updateSiteSettings)


module.exports = router;