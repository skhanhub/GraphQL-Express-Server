"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var express = require("express");
var user_1 = require("../../models/user");
var config_1 = require("../../config");
var app = express();
var config = config_1.default[app.get('env')];
exports.default = {
    createUser: function (args) { return __awaiter(_this, void 0, void 0, function () {
        var result, hashedPassword, user, savedUser, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, user_1.default.findOne({ email: args.userInput.email })];
                case 1:
                    result = _a.sent();
                    if (result) {
                        throw new Error('User already exists.');
                    }
                    return [4 /*yield*/, bcrypt.hash(args.userInput.password, 12)];
                case 2:
                    hashedPassword = _a.sent();
                    user = new user_1.default({
                        email: args.userInput.email,
                        password: hashedPassword,
                    });
                    return [4 /*yield*/, user.save()];
                case 3:
                    savedUser = _a.sent();
                    return [2 /*return*/, ({ email: savedUser.email, password: null })];
                case 4:
                    err_1 = _a.sent();
                    console.log({ err: err_1 });
                    throw err_1;
                case 5: return [2 /*return*/];
            }
        });
    }); },
    login: function (args) { return __awaiter(_this, void 0, void 0, function () {
        var user, isEqual, token, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, user_1.default.findOne({ email: args.email })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error('User does not exist!');
                    }
                    return [4 /*yield*/, bcrypt.compare(args.password, user.password)];
                case 2:
                    isEqual = _a.sent();
                    if (!isEqual) {
                        throw new Error('Password is incorrect!');
                    }
                    return [4 /*yield*/, jwt.sign({
                            userId: user.id,
                            email: user.email,
                        }, "" + config.SECRECT, {
                            expiresIn: '1h'
                        })];
                case 3:
                    token = _a.sent();
                    return [2 /*return*/, {
                            userId: user.id,
                            token: token,
                            tokenExpiration: 1,
                        }];
                case 4:
                    err_2 = _a.sent();
                    console.log({ err: err_2 });
                    throw err_2;
                case 5: return [2 /*return*/];
            }
        });
    }); },
};
//# sourceMappingURL=auth.js.map