import bcrypt from "bcrypt";
import {loginService} from "../services/auth.service.js";
const login = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await loginService(email);
        //res.send(user);

        if(!user){
            return res.status(404).send({message:"Senha ou usuario invalidos"});
        }

        const passwordIsvalid = bcrypt.compareSync(password, user.password)

        if(!passwordIsvalid){
            return res.status(404).send({message: "Senha ou usuario invalidos"})
        }
        res.send("Login ok");
    }catch(err){
        res.status(500).send(err.message);
    }
    
}

export {login};