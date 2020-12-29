module.exports = (req, res, next) => {

    if (!req.user.isInstructor == 'instructor' || !req.user.userType == 'admin') {
        return res.status(403).send({'detail': 'You do not have permission to this view'})} 

    next()
}
