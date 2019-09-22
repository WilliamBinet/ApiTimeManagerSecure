var modele = require('../models/index');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

module.exports = {

    getWorkingTimeByIdBetween: function (req, res) {
        if (req.query !== undefined && Object.keys(req.query).length === 2) {
            if (req.query.start !== undefined && req.query.end !== undefined) {
                modele.WorkingTime.findAll({
                    where: {id_user: req.params.id, start: {[Op.gte]: req.query.start}, end: {[Op.lte]: req.query.end}}
                }).then(
                    (result) => {
                        result !== null ? res.json(result) : res.sendStatus(404)
                    }
                );
            } else {
                res.send("Mauvais paramètres !", 400);
            }
        } else {
            res.send("Mauvais paramètres !", 400);
        }
    },

    getWorkingTimeByIdUserId: function (req, res) {
        modele.WorkingTime.findOne({where: {id_user: req.params.id_user, id: req.params.id_workingtime}})
            .then((result) => (result != null) ? res.json(result) : res.sendStatus(404));
    },

    addWorkingTime : function (req, res) {
        req.body.WorkingTime.id_user = req.params.id_user;
        modele.WorkingTime.create(req.body.WorkingTime)
            .then(newWT => {
                res.json(200, newWT);
            }).catch(function (err) {
            res.send(400, err);
        });
    },

    updateWorkingTime : function (req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        modele.WorkingTime.findOne({
            where: {id: id}
        })
            .then(newWT => {
                return newWT.update(updates)
            })
            .then(updatedNewWT => {
                res.json(updatedNewWT);
            }).catch(ex => {
            res.sendStatus(400);
        });
    },

    deleteWorkingTime : function (req, res) {
        modele.WorkingTime.destroy({
            where: { id: req.params.id }
        })
            .then(deletedWT => {
                if (deletedWT == 0) {
                    res.sendStatus(400);
                } else {
                    res.sendStatus(200);
                }
            }).catch(e => {
            res.sendStatus(400);
        });
    },

    getWorkingTimeOfTeam : function (req, res) {
        modele.TeamMember.findAll({where : {id_team: req.params.id_team}, attributes: ['id_user']}).then(
            users => {
                let usersId =  extractIdFromTeamMemberUsers(users);
                modele.WorkingTime.findAll( {where : {id_user : {[op.in] : usersId}}})
                    .then(workingtimes => res.send(workingtimes))
            }
        ).catch(e => res.send(e));
    }

};

function extractIdFromTeamMemberUsers(members) {
    let idsUsers = [];

    for (const member of members) {
        idsUsers.push(member.id_user);
    }
    return idsUsers;
}
