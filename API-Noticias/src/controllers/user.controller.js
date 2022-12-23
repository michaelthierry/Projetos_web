const userService = require("../services/user.service")

const create  = async (req, res) =>{
    const {nome, username, email, password} = req.body

       
    if(!nome || !username || !email || !password){
        res.status(400).send({mensage:"Submit all field for registration"})
    }

    const  user = await userService.create(req.body)
    if(!user){
        return res.status(400).send({mensage:"Erro ao criar usuario"})
    }
    res.status(201).send({
        mensage: "User create sucessfully",
        user:{
            id: user._id,
            nome,
            username,
            email
        }
    })
}



/*Exporntando a função */
module.exports = {create}