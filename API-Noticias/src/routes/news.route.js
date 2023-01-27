import {Router} from "express";
import {create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews} from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Rota para criar uma nova noticia
router.post("/", authMiddleware,  create);
// Rota pra pegar as noticias
router.get("/", findAll);
// Rota de topo de noticias
router.get("/top", topNews);
// Rota para pegar as noticias pelo titulo
router.get("/search", searchByTitle);
// Rota para pegar as noticias de um usuario especifico
router.get("/byUser", authMiddleware, byUser)
// Rota para pegar noticia pelo id
router.get("/:id", authMiddleware, findById);
// Rota o usuario atualizar uma noticia
router.patch("/:id", authMiddleware, update);
// Rota para apagar uma noticia
router.delete("/:id", authMiddleware, erase);
// Rota para dar like em uma noticia
router.patch("/like/:id", authMiddleware, likeNews);


export default router;