//Importando o mongoose
import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
});

UserSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
//Criando o modelo
const User = mongoose.model("User", UserSchema)
//Exportando o modelo criado
export default User;