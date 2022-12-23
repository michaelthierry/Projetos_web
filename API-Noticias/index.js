const express = require('express')
const userRoute = require("./src/routes/user.route")
const app = express()
const conectDataBase = require("./src/database/db")
const port = 3000

conectDataBase()
app.use(express.json())
app.use("/user", userRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));