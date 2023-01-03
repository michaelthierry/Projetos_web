/**Importando o express */
const route = require('express').Router()
/*Importando as funçoes de controller */
const userController = require("../controllers/user.controller")
/*Importando middleare */
const {validId, validUser} = require("../middlewares/global.middlewares")

/*Rota que cadastar um usuario*/
route.post("/",userController.create);
/*Rota que pega todos os usuarios */
route.get("/", userController.findAll);
/*Encontra o usuario pelo ID */
route.get("/:id", validId, validUser, userController.findById)
//Rota para fazer atualização no banco de dados

route.delete("/", userController.deleteByEmail)

route.patch("/", userController.updateByEmail)



/*Exportando as rotas */
module.exports = route