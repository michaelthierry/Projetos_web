import {createService, findAllService} from "../services/news.service.js"
import { ObjectId } from "mongoose";

const create = async (req, res) => {
    try{
        const {title, text} = req.body;
        const {authorization} = req.headers;
        console.log(authorization);

        if(!authorization){
            return res.send(401)
        }

        const parts = authorization.split(" ");

        if(parts.length !==  2){
            return res.send(401);
        }
        const[schema, token] = parts; 

        if(schema !== "Bearer"){
            return res.send(401);
        }
    
        console.log(parts)

        if(!title || !text){
            req.status(400).send({message: "Submeta todos os campos para registrar"});
        }

        await createService({
            title,
            text,
            user: {_id: "63a5e1b21d5d2124fa22eca4"}
        })
        res.send(201);

    }catch(err){
        res.status(500).send({message: err.message});
    }

   
}

const findAll = async (req, res) => {
    
    try{
        const news = await findAllService();
        if(news.length === 0){
            return res.status(400).send({message: "Não há noticias registradas!"});
        }
        res.send(news)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}


export {
    create,
    findAll
}