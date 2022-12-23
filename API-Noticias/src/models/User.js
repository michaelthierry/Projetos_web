const mongoose = require("mongoose")

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

const User = mongoose.model("User", UserSchema)

module.exports = User