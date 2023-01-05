import {Router} from "express";
import {create, findAll} from "../controllers/news.controller.js"

const router = Router();
//Rota para criar uma nova noticia
router.post("/", create);
//Rota pra pegar as noticias
router.get("/", findAll);

export default router;