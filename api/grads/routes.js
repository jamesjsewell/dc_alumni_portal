const express = require("express"),
    gradController = require("./grad_controller.js"),
    gradRoutes = express.Router()

gradRoutes.post("/grads", gradController.post)
gradRoutes.post("/grads/filter", gradController.get)
gradRoutes.get("/grads/:id", gradController.get)
gradRoutes.get("/grads", gradController.get)
gradRoutes.put("/grads/:id", gradController.update)
gradRoutes.delete("/grads/:id", gradController.delete)

module.exports = gradRoutes
