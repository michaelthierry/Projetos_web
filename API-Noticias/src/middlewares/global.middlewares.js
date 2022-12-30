const mongoose = require("mongoose");
const userService = require("../services/user.service");

const validId = (req, res, next) =>{
    
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        //Retorna a mensagem de erro
        return res.status(400).send({message: "Este id é invalido."})
    }

    next();
};

const validUser = async (req, res, next) =>{
    const id = req.params.id;
    const user  = await userService.findByIdService(id);
    if(!user){
        return res.status(400).send({message: "Usuario não encontrado!"});
    }
    req.id = id;
    req.user = user;
    next();
}

module.exports = {
    validId, 
    validUser
}