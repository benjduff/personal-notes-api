const Session = require('../models/sessions');

//validate user session token and set query callback
exports.validateSession = function(req, res){
    Session.validateToken(req.params.token, (err, result) => {
        if(err || result < 1){
            res.status(404).json({tokenValidated: false});
        } else {
            res.status(200).json({tokenValidated: true});
        }
    })
}