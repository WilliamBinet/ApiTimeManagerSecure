var modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
let userUtil = require('../utils/usersUtils');
let jwtUtils = require('../utils/jwtUtils');

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
            req.body.user.password = bcrypt.hashSync(req.body.user.password, 10);
            modele.User.create(req.body.user)
                .then(newUser => {
                    res.json(200, newUser);
                });
        } else{
            res.send('test');
        }
    },

    connectUser : function (req, res) {
        if (userUtil.validateLogin(req.body.user)) {
            modele.User.findOne( {
                where: {email: req.body.user.email}
            })
                .then(newUser => {
                    if (newUser == null) {
                        res.send(400, "Aucun utilisateur n'a cet email");
                    } else if (!bcrypt.compareSync(req.body.user.password, newUser.password)){
                        res.send("Wrong password");
                    } else {
                        res.cookie
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
        console.log("Mon id " + userId);
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
