const Errors = require('../models/errorLogs');
const { logger } = require('./loggerMiddleware');

//Description: Handle the error and throw the error in API response instead crashing the applicaiton
exports.errorHandler = async (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);

    console.log(`${err.stack}`.red);

    if (err) {

        let newError = new Errors({
            message: err.message,
            IP: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            stack: err.stack
        })

        if (process.env.NODE_ENV === 'production' && statusCode === 500) {
            await newError.save();
            logger(err.message, err.stack, req.headers['x-forwarded-for'] || req.socket.remoteAddress)
        }

        res.json({
            message: err.message,
            isSuccess: false,
            status: 'failed',
            code: statusCode,
            // stack: process.env.NODE_ENV === 'production' ? null : err.stack
        });

    } else {
        next();
    }
};




//Description: Show an error message on API response if the route is not defined
exports.notFound = (req, res, next) => {
    const error = new Error(`${req.originalUrl} Not Found`.red.underline);
    res.status(404);
    next(error);
};