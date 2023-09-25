const express = require("express");
const middleware = require("./users.middleware");
const controller = require("./users.controller");
const bodyParser = require("body-parser");

const userRoute = express.Router();

userRoute.use(bodyParser.json());

userRoute.post("/", middleware.checkbody, controller.createuser);
// userRoute.get("/", middleware.checkbody, controller.createuser);

module.exports = userRoute
