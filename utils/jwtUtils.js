let jwt = require('jsonwebtoken');
const KEY = "k9GkKBhgyuoNcgyHOuaTnOmcwvuJugF5MG58Gg0mdzqgIbbfcaOJYuAomLp0AaP";
module.exports = {

    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
            userRole: userData.id_role,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email
        }, KEY, {
            expiresIn: "30 days"
        });
    },

    getAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    getUserId: function (authorization) {
        let token = module.exports.getAuthorization(authorization);
        let userId = -1;
        console.log('Mon token' + token);
        if (token !== null) {
            try {
                const verifToken = jwt.verify(token, KEY);
                if (verifToken !== null) {
                    userId = verifToken.userId;
                }
            } catch (e) {
            }
        }
        return userId;
    }


};
