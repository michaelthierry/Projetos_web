//Importando o mongoose
const mongoose = require("mongoose")
//Criando o esquema de usuário
const UserSchema = new mongoose.Schema({
    nome: {
        type:String,
        require: true
    },
    username: {
        type:String,
        require: true
    },
    email: {
        type:String,
        require: true,
        unique: true
    },
    password: {
        type:String,
        require: true
    }
})
//Criando o modelo
const User = mongoose.model("User", UserSchema)
//Exportando o modelo criado
module.exports = User