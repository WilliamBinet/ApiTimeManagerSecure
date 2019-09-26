let jwtUtils = require('./jwtUtils');
module.exports = {

    AdministratorRight: function (req, res, next) {
        try {
            let jwt = jwtUtils.getAuthorization(req.headers.authorization);
            let decoded = jwtUtils.validateToken(jwt);
            if (decoded !== null) {
                if (decoded.role === 'Administrator') {
                    next();
                } else {
                    res.send(403);
                }
            } else {
                res.send(403);
            }
        } catch (e) {
            res.send(403);
        }
    },

    ManagerRight: function (req, res, next) {
        try {
            let jwt = jwtUtils.getAuthorization(req.headers.authorization);
            let decoded = jwtUtils.validateToken(jwt);
            if (decoded !== null) {
                if (decoded.role === 'Administrator' || decoded.role === 'Manager') {
                    next();
                } else {
                    res.send(403);
                }
            } else {
                res.send(403);
            }
        } catch (e) {
            console.log(e.message);
        }
    },

    EmployeeRight: function (req, res, next) {
        let jwt = jwtUtils.getAuthorization(req.headers.authorization);
        let decoded = jwtUtils.validateToken(jwt);
        console.log(decoded.role);
        if (decoded !== null) {
            if (decoded.role === 'Administrator' || decoded.role === 'Manager' || decoded.role === 'Employee') {
                next();
            } else {
                //  res.send(403);
            }
        } else {
            //  res.send(403);

        }

    }
};
