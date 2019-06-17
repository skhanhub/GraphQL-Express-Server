"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("./auth");
var events_1 = require("./events");
var bookings_1 = require("./bookings");
exports.default = __assign({}, auth_1.default, events_1.default, bookings_1.default);
//# sourceMappingURL=index.js.map