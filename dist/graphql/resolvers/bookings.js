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
var booking_1 = require("../../models/booking");
var merge_1 = require("./merge");
var event_1 = require("../../models/event");
exports.default = {
    bookings: function (args, req) { return __awaiter(_this, void 0, void 0, function () {
        var bookings, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!req.isAuth) {
                        throw new Error('Unauthenticated!');
                    }
                    return [4 /*yield*/, booking_1.default.find()];
                case 1:
                    bookings = _a.sent();
                    return [2 /*return*/, bookings.map(function (booking) {
                            return merge_1.transformBooking(booking);
                        })];
                case 2:
                    err_1 = _a.sent();
                    console.log({ err: err_1 });
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    }); },
    bookEvent: function (args, req) { return __awaiter(_this, void 0, void 0, function () {
        var returnedEvent, booking, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!req.isAuth) {
                        throw new Error('Unauthenticated!');
                    }
                    return [4 /*yield*/, event_1.default.findOne({
                            _id: args.eventId
                        })];
                case 1:
                    returnedEvent = _a.sent();
                    if (!returnedEvent) {
                        throw new Error('Event not found.');
                    }
                    return [4 /*yield*/, new booking_1.default({
                            user: req.userId,
                            event: returnedEvent
                        })];
                case 2:
                    booking = _a.sent();
                    return [4 /*yield*/, booking.save()];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, merge_1.transformBooking(result)];
                case 4:
                    err_2 = _a.sent();
                    console.log({ err: err_2 });
                    throw err_2;
                case 5: return [2 /*return*/];
            }
        });
    }); },
    cancelBooking: function (args, req) { return __awaiter(_this, void 0, void 0, function () {
        var booking, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!req.isAuth) {
                        throw new Error('Unauthenticated!');
                    }
                    return [4 /*yield*/, booking_1.default.findById(args.bookingId).populate('event')];
                case 1:
                    booking = _a.sent();
                    if (!booking) {
                        throw new Error('Booking not found.');
                    }
                    return [4 /*yield*/, booking_1.default.deleteOne({
                            _id: args.bookingId
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, merge_1.transformEvent(booking.event)];
                case 3:
                    err_3 = _a.sent();
                    console.log({ err: err_3 });
                    throw err_3;
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
//# sourceMappingURL=bookings.js.map