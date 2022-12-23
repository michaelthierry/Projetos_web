/**Importando o express */
const route = require('express').Router()
/*Importando as funçoes de controller */
const userController = require("../controllers/user.controller")

route.get("/",userController.soma)


/*Exportando as rotas */
module.exports = route