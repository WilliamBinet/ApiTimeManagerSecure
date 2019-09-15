var express = require('express');
var router = express.Router();
var modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
var validator = require('validator');
module.exports = {
    validateInsert: function (params) {
        console.log(params.email);
        return params.email !== undefined && params.password !== undefined && params.firstname !== undefined && params.lastname !== undefined && validator.isEmail(params.email);
    },
    validateLogin : function (params) {
        return params.email !== undefined && params.password !== undefined;
    }
};

