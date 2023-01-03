//Importando o express
import express from "express";
//Importando as rotas
import userRoute from "./src/routes/user.route.js"
//Importando o conector do banco de dados
import connectDatabase from "./src/database/db.js";

import dotenv from "dotenv";

dotenv.config();
//Criando o App
const app = express()
//Porta a ser usada
const port = process.env.PORT || 3000;
//conectadno a base de dados
connectDatabase()
app.use(express.json())
app.use("/user", userRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));