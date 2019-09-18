var express = require('express');
var router = express.Router();
var modele = require('../models/index');



module.exports = {

    getAllTeam: function (req, res) {
        return modele.Team.findAll().then(teams => {
            res.json(teams);
        }).catch(e => {
            res.send(e);
        })
    },

    getTeamById: function (req, res) {
        return modele.Team.findOne({where: {id: req.params.id}}).then(team => {
            res.json(team);
        }).catch(e => {
            res.send(e);
        })
    },

    updateTeamById: function (req, res) {
        const updates = req.body.updates;

        modele.Team.findOne({where: {id: req.params.id}}).then(team => {
            team.update(updates);
        }).then(updatedTeam => res.json(200)).catch(e => res.send(e));
    },

    deleteTeamById: function (req, res) {
        modele.Team.destroy({where: {id: req.params.id}}).then(deletedTeam => deletedTeam === 0 ?
            res.sendStatus(400) : res.sendStatus(200));
    },

    insertTeam: function (req, res) {
        modele.User.create(req.body.team)
            .then(insertedTeam => res.send(insertedTeam))
            .catch(e => res.send(e));
    },

    addUserToTeam: function (req, res) {
        modele.TeamMember.create(req.body.teammember)
            .then(teamMember => res.send(teamMember))
            .catch(e => res.send(e));
    },

    removeUserFromTeam: function (req, res) {
        modele.TeamMember.destroy({where : {id_user : req.params.id_user, id_team : req.params.id_team}})
            .then(deletedMember => deletedMember === 0 ? res.send(400) : res.send(200))
            .catch(e => res.send(e));
    },





};


