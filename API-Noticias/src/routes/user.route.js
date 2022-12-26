/**Importando o express */
const route = require('express').Router()
/*Importando as funçoes de controller */
const userController = require("../controllers/user.controller")

/*Rota que cadastar um usuario*/
route.post("/",userController.create);
/*Rota que pega todos os usuarios */
route.get("/", userController.findAll);
/*Encontra o usuario pelo ID */
route.get("/:id", userController.findById)
//Rota para fazer atualização no banco de dados




/*Exportando as rotas */
module.exports = route