

var express = require('express');
var router = express.Router();
var modele = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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
        console.log(JSON.stringify(req.body.team));
        modele.Team.create(req.body.team)
            .then(insertedTeam => res.send(insertedTeam))
            .catch(e => res.send(e));
    },

    addUserToTeam: function (req, res) {
        console.log(JSON.stringify(req.body.teammember));
        modele.TeamMember.create(req.body.teammember)
            .then(teamMember => res.send(teamMember))
            .catch(e => res.send(e));
    },

    removeUserFromTeam: function (req, res) {
        modele.TeamMember.destroy({where : {id_user : req.params.id_user, id_team : req.params.id}})
            .then(deletedMember => deletedMember === 0 ? res.send(400) : res.send(200))
            .catch(e => res.send(e));
    },

    getMemberOfTeam : function (req, res) {
        modele.TeamMember.findAll({where : {id_team : req.params.id}}).then(
            teams => {
                modele.User.findAll( {where : {id : {[Op.in] : extractIdUserFromTeam(teams)}}}).then(resp => {
                    res.send(resp);
                }).catch(e => {
                    console.log(e)
                })
            }).catch( e => {
                res.send(e);
        })
    },

    getNonMemberOfTeam : function (req, res) {
        modele.TeamMember.findAll({where : {id_team : req.params.id}}).then(
            teams => {
                modele.User.findAll( {where : {id : {[Op.notIn] : extractIdUserFromTeam(teams)}}}).then(resp => {
                    res.send(resp);
                }).catch(e => {
                    console.log(e)
                })
            }).catch( e => {
            res.send(e);
        })
    },

    getUserTeams : function (req, res) {
        modele.TeamMember.findAll({where : {id_user : req.params.id_user}}).then(resp => {
            modele.Team.findAll({where : {id :{[Op.in ] : extractIdTeamFromTeamMember(resp)}}}).then(teams => {
                res.send(teams);
            })
        }).catch(e => {
            res.send(400, 'Error on select teams')
        })
    },

    getTeamOfManager : function (req, res) {
        modele.Team.findAll({where : { id_manager : req.params.id_manager}}).then(resp => {
            res.send(resp);
        }).catch( e => {
            res.send(400);
        })
    }
};

function extractIdUserFromTeam(team) {
    let userId = [];
    for (const modeleElement of team) {
        userId.push(modeleElement.id_user);
    }
    return userId;
}

function extractIdTeamFromTeamMember(TeamMembers) {
    let teamIds = [];
    for (const modeleElement of TeamMembers) {
        teamIds.push(modeleElement.id_team);
    }
    return teamIds;
}


