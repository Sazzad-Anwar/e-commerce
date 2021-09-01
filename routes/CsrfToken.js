const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

/*
#### @Description: Get _csrf token for all authenticated user
#### Route: /api/v1/csrf-token
#### Method: GET
*/
router
    .route('/')
    .get(csrfProtection, asyncHandler(async (req, res) => {
        if (req.cookies.token) {
            res.json({
                code: 200,
                status: 'success',
                isSuccess: true,
                data: {
                    _csrf: req.csrfToken()
                }
            })
        } else {
            res.status(401).json({
                code: 401,
                status: 'failed',
                isSuccess: false,
                message: 'Request Not allowed'
            })
        }
    }));



module.exports = router;