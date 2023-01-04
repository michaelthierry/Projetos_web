/**Importando o express */
import {Router} from "express";
/*Importando as funçoes de controller */
import userController  from "../controllers/user.controller.js";
/*Importando middleare */
import {validId, validUser} from "../middlewares/global.middlewares.js";

const router = Router();

/*Rota que cadastar um usuario*/
router.post("/",userController.create);
/*Rota que pega todos os usuarios */
router.get("/", userController.findAll);
/*Encontra o usuario pelo ID */
router.get("/:id", validId, validUser, userController.findById)
//Rota para fazer atualização no banco de dados

router.delete("/", userController.deleteByEmail)

router.patch("/", userController.updateByEmail)



/*Exportando as rotas */
export default router