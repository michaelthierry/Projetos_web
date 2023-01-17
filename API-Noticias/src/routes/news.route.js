import {Router} from "express";
import {create, findAll} from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();
//Rota para criar uma nova noticia
router.post("/", authMiddleware,  create);
//Rota pra pegar as noticias
router.get("/", findAll);

export default router;