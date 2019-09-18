var modele = require('../models/index');
let userUtil = require('../utils/usersUtils');
let jwtUtils = require('../utils/jwtUtils');
var bcrypt = require('bcrypt');

module.exports = {
    getUsers : function (req, res) {
        if (Object.keys(req.query).length !== 0) {
            getUserByMailAndUsername(res, req.query);
        } else {
            modele.User.findAll().then((result) => res.json(result));
        }
    },

    getUserById : function (req, res) {
        modele.User.findOne({where: {id: req.params.id}}).then((result) => res.json(result));
    },

    updateUser : function (req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        modele.User.findOne({
            where: {id: id}
        })
            .then(owner => {
                return owner.update(updates)
            })
            .then(updatedOwner => {
                res.json(updatedOwner);
            });
    },

    createUser : function (req, res) {
        if (userUtil.validateInsert(req.body.user)) {
            req.body.user.password = bcrypt.hashSync(req.body.user.password, 12);
            modele.User.create(req.body.user)
                .then(newUser => {
                    res.json(200, newUser);
                });
        } else{
            res.send('test');
        }
    },

    connectUser : function (req, res) {
        console.log("TEST =>>>>>>>>>>>>>>>>>>>  " + req.body.user);
        if (userUtil.validateLogin(req.body.user)) {
            modele.User.findOne( {
                where: {email: req.body.user.email}
            })
                .then(newUser => {
                    console.log(req.body.user.password   +  "   "   + newUser.password);
                    if (newUser == null) {
                        res.send(400, "Aucun utilisateur n'a cet email");
                    } else if (!bcrypt.compareSync(req.body.user.password, newUser.password)){
                        res.send("Wrong password");
                    } else {
                        res.send( jwtUtils.generateTokenForUser(newUser));
                    }
                });
        }
    },

    deleteUser : function (req, res) {
        modele.User.destroy({
            where: {id: req.params.id}
        })
            .then(deletedPet => {
                if (deletedPet == 0) {
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200);
                }
            });
    },

    getProfile : function (req, res) {
        var headerAuth =  req.headers.authorization;
        var userId = jwtUtils.getUserId(headerAuth);
        if (userId !== - 1) {
            modele.User.findOne({where: {id: userId}}).then((result) => res.json(result));
        }
    }
};

function getUserByMailAndUsername(res, params) {
    if (params.username !== undefined && params.email !== undefined) {
        modele.User.findOne({
            where: {username: params.username, email: params.email}
        }).then(
            (result) => {
                result !== null ? res.json(result) : res.sendStatus(404)
            }
        );
    } else {
        res.send("Mauvais paramètres !", 400);
    }
}
