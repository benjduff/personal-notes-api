const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports.checkToken = function(req, res, next){    
    try {
        //Get token from auth header
        const token = req.headers.authorization;
        //verify against private key
        const decoded = jwt.verify(token, config.JWT_KEY);
        //pass decoded token data to response
        res.locals.userData = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({msg: 'Unauthorized'});
    }
}