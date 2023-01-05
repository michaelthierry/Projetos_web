import {createService, findAllService} from "../services/news.service.js"

const create = async (req, res) => {
    try{
        const {title, text} = req.body;

        if(!title || !text){
            req.status(400).send({message: "Submeta todos os campos para registrar"});
        }

        await createService({
            title,
            text,
            banner,
            id: "objidfake"
        })
        res.send(201);
    }catch(err){
        res.send(500).send({message: err.message});
    }

   
}

const findAll = (req, res) => {
    const news = [];

    res.send(news);
}

export default {
    create,
    getAll
}