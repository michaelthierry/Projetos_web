/**Importando o express */
const route = require('express').Router()
/*Importando as funçoes de controller */
const userController = require("../controllers/user.controller")

route.post("/",userController.create)


/*Exportando as rotas */
module.exports = route