//Importando o express
const express = require('express')
//Importando as rotas
const userRoute = require("./src/routes/user.route")
//Importando o conector do banco de dados
const conectDataBase = require("./src/database/db")
//Criando o App
const app = express()
//Porta a ser usada
const port = 3000
//conectadno a base de dados
conectDataBase()
app.use(express.json())
app.use("/user", userRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));