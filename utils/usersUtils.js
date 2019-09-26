const express = require('express');
const router = express.Router();
const modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');
module.exports = {
    validateInsert: function (params) {
        console.log(params.email);
        return params.email !== undefined && params.password !== undefined && params.firstname !== undefined && params.lastname !== undefined && validator.isEmail(params.email);
    },
    validateLogin : function (params) {
        return params.email !== undefined && params.password !== undefined;
    }
};

