let jwt = require('jsonwebtoken');
let KEY = "rPgfPPNVhDMJv43zstg0_x1ElY4XVPt3qOhpzh7V5gxOzeXzaZ4W5oATyK_GFvf-57GcXwIlBhwuQ5v77g74yB8sOgBSMd_pMy4WttpSLvQUjXWZj3Z_zPGa-u9B84JFWECKEmLuCIF8HrKvP74K1XZB0kCi7u41xpAgyGTsBuCmsqBdZtwjUz_vHqq4yrugGEbMZw79mdAIwhIjPsQNfbqAJM96Ffmqz0BSrAIM34Mzacu4I0pfdY-GUmCSGcs0hkCql3lFJcCFa_mvI0IVYRdI9zKVXjSYBin2KlYR4jx8Mts8WmsHlT0H6O6-LiAG0l6cgw_0y7l-i9bK_mFR-w";

module.exports = {

    generateTokenForUser: function (userData) {
        return jwt.sign({
            id: userData.id,
            role: userData.role,
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
    },

    validateToken : function (token) {
        console.log("Decoded " + jwt.verify(token, KEY));

        return jwt.verify(token, KEY);
    }


};
