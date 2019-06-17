"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var express = require("express");
var config_1 = require("../config");
var app = express();
var config = config_1.default[app.get('env')];
exports.default = (function (req, res, next) {
    try {
        var authHeader = req.get('Authorization');
        if (!authHeader) {
            req.isAuth = false;
            return next();
        }
        var token = authHeader.split(' ')[1]; // Authorization: Bearer tokenValue
        if (!token || token === '') {
            req.isAuth = false;
            return next();
        }
        var decodedToken = void 0;
        try {
            decodedToken = jwt.verify(token, "" + config.SECRECT);
        }
        catch (err) {
            console.log(err);
            req.isAuth = false;
            return next();
        }
        if (!decodedToken) {
            req.isAuth = false;
            return next();
        }
        req.isAuth = true;
        req.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
//# sourceMappingURL=is-auth.js.map