const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(typeof authHeader === 'undefined') {
        return res.status(403).json({
            success: false,
            message:'Authorization header is required'
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedPayload = jwt.verify(token, '12345')

        req.auth = decodedPayload
    } catch(err) {
        return res.status(403).json({
            success: false,
            message:'Token invalid'
        })
    }

    next()
}

module.exports = authMiddleware