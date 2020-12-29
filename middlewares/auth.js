const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
        const authHeader = req.headers.authorization
        let result

        if (authHeader){
            const token = req.headers.authorization.split(' ')[1]
            const options = {
                expiresIn: '1d',
                issuer: 'essly-auth'
            }
            try {
                result = jwt.verify(token, process.env.JWT_PRIVATE_KEY, options)
                req.user = result
                next()
            } catch (err){
                res.status(400).send({'detail': err.message})
            }
        } else {
            result = {
                'detail': 'Authentication error. Token required',
            }
            res.status(401).send(result)
        }
    }
