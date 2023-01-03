//Importando o express
import express from "express";
//Importando as rotas
import userRoute from "./src/routes/user.route.js"
//Importando o conector do banco de dados
import connectDatabase from "./src/database/db.js";
//Criando o App
const app = express()
//Porta a ser usada
const port = 3000
//conectadno a base de dados
connectDatabase()
app.use(express.json())
app.use("/user", userRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));