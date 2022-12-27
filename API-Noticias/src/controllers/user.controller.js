const userService = require("../services/user.service")
const mongoose = require("mongoose")

/**
 * Cria um novo usuario na base de dados 
 * @returns Se algum campo nescessário não foi submentido ou houve um erro ao registrar o usuario
 * é retornado o erro com status 400. Caso contrario um mesagem é retornado com sucesso e status 201
 */
const create  = async (req, res) =>{
    const {nome, username, email, password} = req.body

       
    if(!nome || !username || !email || !password){
        res.status(400).send({mensage:"Submeta todos os campos para registro"})
    }

    const  user = await userService.createService(req.body)
    if(!user){
        return res.status(400).send({mensage:"Erro ao criar usuario"})
    }
    res.status(201).send({
        mensage: "Usuario criado com sucesso",
        user:{
            id: user._id,
            nome,
            username,
            email
        }
    })
}

/**
 * deleta um usuário 
 * @returns 
 */
const deleteByEmail = async (req, res) =>{
    const { email } = req.query

    if(!email){
        res.status(400).send({ mensage:"missing email" })
    }

    const user = await userService.deleteService(email);

    if(!user){
        return res.status(400).send({ mensage:"error" })
    }

    return res.status(200).send();
}

/**
 * Encontra todos os usuario cadastrados
 * @returns Se não houver usuario retorna uma mensagem com status 400.
 * Se não retorna todos os usuarios 
 */
const findAll = async (req, res) =>{
    const users = await userService.findAllService()
    if(users.length == 0){
        return res.status(400).send({message: "Não há usuarios registrados!"});
    }
    res.send(users)
}

/**
 * Escontra um usuário pelo id
 * @returns 
 */
const findById = async(req, res) =>{
    //Recebe o id do parametro da req
    const id = req.params.id
    //se esse id pertence não pertence a base de dados
    if(!mongoose.Types.ObjectId.isValid(id)){
        //Retorna a mensagem de erro
        return res.status(400).send({message: "Este id é invalido."})
    }
    //Espera a tentativa de encontra o usuario na base de dados
    const user  = await userService.findByIdService(id)
    //Se o usuario não existe
    if(!user){
        return res.status(400).send({message: "Usuario não encontrado"})
    }
    //Se existir
    res.send(user)
}

/*Exportando as funções */
module.exports = {
    create,
    findAll, 
    findById,
    deleteByEmail
}