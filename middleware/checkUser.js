exports.vendorAccess = (req, res, next) => {
    if (req.user.type === 'vendor') {
        next()
    } else {
        res.status(403)
        throw new Error('You are not allowed !')
    }
}

exports.userAccess = (req, res, next) => {
    if (req.user.type === 'user') {
        next()
    } else {
        res.status(403)
        throw new Error('You are not allowed !')
    }
}

