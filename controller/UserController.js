
var sequelize = require('sequelize');
var modele = require('../models/index');
let userUtil = require('../utils/usersUtils');
let jwtUtils = require('../utils/jwtUtils');
var bcrypt = require('bcrypt');

module.exports = {
    getUsers: function (req, res) {
        if (Object.keys(req.query).length !== 0) {
            getUserByRole(res, req.query);
        } else {
            modele.User.findAll().then((result) => res.json(result));
        }
    },

    getUserById: function (req, res) {
        modele.User.findOne({where: {id: req.params.id}}).then((result) => res.json(result));
    },

    updateUser: function (req, res) {
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

    createUser: function (req, res) {
        if (userUtil.validateInsert(req.body.user)) {
            req.body.user.password = bcrypt.hashSync(req.body.user.password, 12);
            modele.User.create(req.body.user)
                .then(newUser => {
                    res.json(newUser);
                }).catch(sequelize.ValidationError, function (err) {
                    res.status(400).send('Adresse already in use');
            });
        } else {
            res.send('test');
        }
    },

    connectUser: function (req, res) {
        if (userUtil.validateLogin(req.body.user)) {
            modele.User.findOne({
                where: {email: req.body.user.email}
            })
                .then(newUser => {
                    if (newUser == null) {
                        res.send(400);
                    } else if (!bcrypt.compareSync(req.body.user.password, newUser.password)) {
                        res.send(400);
                    } else {
                        const cookieOptions = {
                            httpOnly: true,
                            expires: 0
                        };
                        res.cookie('JWTimeManager' , jwtUtils.generateTokenForUser(newUser),cookieOptions);
                        res.send(generateConnexionResp(newUser));
                    }
                });
        }
    },

    deleteUser: function (req, res) {
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

    getProfile: function (req, res) {
        var headerAuth = req.headers.authorization;
        var userId = jwtUtils.getUserId(headerAuth);
        if (userId !== -1) {
            modele.User.findOne({where: {id: userId}}).then((result) => res.json(result));
        }
    }
};


function generateConnexionResp(user) {
    return {

        user: {
            role: user.role,
            firstname: user.firstname,
            lastname: user.lastname,
        },
        token: jwtUtils.generateTokenForUser(user)
    }
}

function getUserByRole(res, params) {
    if (params.role !== undefined) {
        modele.User.findAll({
            where: {role: params.role}
        }).then(
            (result) => {
                result !== null ? res.json(result) : res.sendStatus(404)
            }
        );
    } else {
        res.send("Mauvais paramètres !", 400);
    }
}
