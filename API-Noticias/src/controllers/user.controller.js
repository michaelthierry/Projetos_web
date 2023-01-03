const userService = require("../services/user.service")


/**
 * Cria um novo usuario na base de dados 
 * @returns Se algum campo nescessário não foi submentido ou houve um erro ao registrar o usuario
 * é retornado o erro com status 400. Caso contrario um mesagem é retornado com sucesso e status 201
 */
const create  = async (req, res) =>{

    try{
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

    }catch(err){
        res.status(500).send({message: err.message})
    }
    
}

/**
 * deleta um usuário 
 * @returns 
 */
const deleteByEmail = async (req, res) =>{
    try{
        const { email } = req.query

        if(!email){
            res.status(400).send({ mensage:"missing email" })
        }

        const user = await userService.deleteService(email);

        if(!user){
            return res.status(400).send({ mensage:"error" })
        }

        return res.status(200).send();

    }catch(err){
        res.status(500).send({message: err.message})
    }
}

/**
 * Encontra todos os usuario cadastrados
 * @returns Se não houver usuario retorna uma mensagem com status 400.
 * Se não retorna todos os usuarios 
 */
const findAll = async (req, res) =>{
    try{
        const users = await userService.findAllService()
        if(users.length == 0){
            return res.status(400).send({message: "Não há usuarios registrados!"});
        }
        res.send(users)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}

/**
 * Escontra um usuário pelo id
 * @returns 
 */
const findById = async(req, res) =>{
    try{
         //Recebe o user do paramentro da requisição do middleware
        const user  = req.user;
        //Se existir
        res.send(user)
    }catch(err){
        res.status(500).send({message:err.message})
    }
   
}


/**
 * 
 */
const updateByEmail = async(req, res) =>{

    try{
         //Recebe o email 
        const email = req.query.email
        const {nome, username, password} = req.body

        if(!email){
            return res.status(400).send({message: "Email não foi colacado!"})
        }

        const user = await userService.updateUserByEmail(email, nome, username, password)

        if(!user){
            return res.status(400).send({message: "Erro ao atualizar o usuario!"})
        }
    
        return res.status(200).send(user)
    }catch(err){
        res.status(500).send({message:err.message})
    }
   
}



/*Exportando as funções */
module.exports = {
    create,
    findAll, 
    findById,
    deleteByEmail,
    updateByEmail
}