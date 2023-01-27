import {Router} from "express";
import {create, findAll, topNews, findById} from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();
//Rota para criar uma nova noticia
router.post("/", authMiddleware,  create);
//Rota pra pegar as noticias
router.get("/", findAll);
//Rota de topo de noticias
router.get("/top", topNews);
//Rota para pegar noticia pelo id
router.get("/:id", findById);

export default router;