"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var expressGraphql = require("express-graphql");
var mongoose = require("mongoose");
var schema_1 = require("./graphql/schema");
var resolvers_1 = require("./graphql/resolvers");
var config_1 = require("./config");
var is_auth_1 = require("./middleware/is-auth");
// Port on which incoming requests will arrive
var port = 5000;
// Create the application
var app = express();
// Load the configs
var config = config_1.default[app.get('env')];
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(is_auth_1.default);
app.use('/graphql', expressGraphql({
    schema: schema_1.default,
    rootValue: resolvers_1.default,
    graphiql: true,
}));
mongoose.connect("mongodb://10.126.172.232:27017/" + config.MONGO_DB + "?retryWrites=true&w=majority", { useNewUrlParser: true }).then().catch(function (err) {
    console.log(err);
});
// mongoose.connect(
//     `mongodb+srv://${
//         config.MONGO_USER
//     }:${
//         config.MONGO_PASSWORD
//     }@cluster0-lninh.gcp.mongodb.net/${
//         config.MONGO_DB
//     }?retryWrites=true&w=majority`,
//     { useNewUrlParser: true }
// ).then().catch(err => {
//     console.log(err);
// })
// Run the web app and store the returned variable for later export
var server = app.listen(port, function () { return console.log("Listening on " + port); });
// Export the server for unit testing
exports.default = server;
//# sourceMappingURL=app.js.map