exports.hasPermission = (role) => {
    return (req, res, next) => {
        if (role.includes(req.user.role)) {
            next()
        } else {
            res.status(403)
            throw new Error(`Only ${role} can access this route`)
        }
    }

}
