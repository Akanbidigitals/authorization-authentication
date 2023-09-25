const express = require("express");
const bodyParser = require("body-parser");
const controller = require("../controller");
const globalmiddleware = require("../global.middleware");

const itemRouter = express.Router()

itemRouter.use(bodyParser.json())

itemRouter.get("/",globalmiddleware.check_apikey,controller.getAllItems)

itemRouter.get("/:id",globalmiddleware.check_apikey,controller.getOneItem)// get one item

itemRouter.post("/",globalmiddleware.check_apikey,globalmiddleware.checkAdmin,controller.postItems)

itemRouter.put("/:id",globalmiddleware.check_apikey,globalmiddleware.checkAdmin,controller.updateItem)

itemRouter.delete("/:id",globalmiddleware.check_apikey,globalmiddleware.checkAdmin,controller.deleteItems)


module.exports = itemRouter